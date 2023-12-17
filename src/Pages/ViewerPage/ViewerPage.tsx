import Navbar from "@/components/Navbar/Navbar";
import { useUser } from "@clerk/clerk-react";
import MainContent from "../Dashboard/_components/MainContent";
import { Id } from "convex/_generated/dataModel";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ContentType, NotAuthorisedType } from "@/Types/Types";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ConvexClient } from "@/App";
import { DocDataContext } from "@/Context/Context";

function PageMode() {
  const { user } = useUser();
  const params = useSearchParams()[0];
  const [docData, setdocData] = useState<ContentType | NotAuthorisedType>({
    authorised: false,
  });
  const [sideBarOpen, setsideBarOpen] = useState(false);
  const [documentLoading, setdocumentLoading] = useState(true);
  const documentId: Id<"DocumentData"> | any = params.get("documentId") || null;
  const [initialUpdate, setinitialUpdate] = useState(false);

  const documentData: any =
    useQuery(api.Documents.GetDocumentDataByIdForPageView, {
      id: documentId,
    }) || null;

  useEffect(() => {
    if (initialUpdate || !documentData) {
      return;
    }
    setinitialUpdate(true);

    if (!documentData?.authorised) {
      return;
    }
    setdocumentLoading(true);

    ConvexClient.query(api.Documents.GetDocumentContentByIdForPageView, {
      id: documentData?.Content_Ref || null,
    }).then((e) => {
      setdocData(e);
      setdocumentLoading(false);
    });
  }, [documentData]);

  return (
    <DocDataContext.Provider
      value={{
        documentContentId: documentData?.Content_Ref || null,
        documentId,
        user,
        docData,
        setsideBarOpen,
        sideBarOpen,
        documentLoading,
      }}
    >
      <div className="relative min-h-screen w-full bg-gray-200 dark:bg-neutral-900">
        <Navbar />
        <div className="flex h-[calc(100vh-3.5rem)] w-full gap-4 p-2">
          <div className="h-full w-full flex-[4] relative flex justify-center">
            <div
              className="
            p-2 w-full lg:w-[80%] 
            max-w-[1000px]
             h-full 
             rounded-md  
             bg-background   
             absolute left-1/2 -translate-x-1/2
             overflow-y-auto 
           "
            >
              <MainContent isEditable={!!user} pageMode={true} />
            </div>
          </div>
        </div>
      </div>
    </DocDataContext.Provider>
  );
}

export default PageMode;
