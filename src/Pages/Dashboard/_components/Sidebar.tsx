import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ConvexClient } from "@/App";
import { api } from "../../../../convex/_generated/api";
import Loading from "@/components/Loading/Loading";
import Share from "@/components/Share/Share";
import { DocumentType } from "@/Types/Types";
import { Id } from "convex/_generated/dataModel";
import { DocDataContext } from "@/Context/Context";

function SideBar() {
  const navigate = useNavigate();

  const {
    user,
    sideBarOpen,
    setsideBarOpen,
    docData,
    documentId,
    documents,
  }: any = useContext(DocDataContext);

  const sideBarClassname = cn(
    `
      fixed
      left-0

      z-[2]
      p-2
      lg:left-auto
      lg:static
      bg-background
      rounded-md
      h-full
       w-full
      min-w-[300px] 
      flex-[1] 
      space-y-2
      overflow-y-auto
      flex-col
      items-center
     `,
    `${sideBarOpen ? "flex" : "hidden"}`,
    `lg:flex`
  );

  const onCreate = async () => {
    await ConvexClient.mutation(api.Documents.AddDocuments, {
      owner: user.id,
    });
  };
  const onDelete = async (docId: Id<"DocumentData">) => {
    const id = await ConvexClient.mutation(api.Documents.DeleteDocumentById, {
      id: docId,
      uid: user.id,
    });
    if (id === documentId) {
      navigate("/dashboard");
    }
  };

  if (!documents) {
    return (
      <div className={sideBarClassname}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={sideBarClassname}>
      <div className="flex justify-center gap-4 w-full">
        <Button className="w-1/2" onClick={onCreate}>
          New Doc
          <Plus size={20} />
        </Button>
        {docData ? <Share /> : null}
      </div>

      {documents.length > 0 ? (
        documents?.map((e: DocumentType) => (
          <li className="w-full flex" key={e._id}>
            <Button
              variant={"ghost"}
              className="w-full justify-start"
              onClick={() => {
                navigate({
                  search: createSearchParams({
                    documentId: e._id,
                  }).toString(),
                });
                setsideBarOpen(false);
              }}
            >
              {e?.title}
            </Button>
            <Button
              variant={"ghost"}
              className="rounded-xl"
              onClick={() => {
                onDelete(e._id);
              }}
              size={"icon"}
            >
              <Trash />
            </Button>
          </li>
        ))
      ) : (
        <h3>No Docs Added</h3>
      )}
    </div>
  );
}

export default SideBar;
