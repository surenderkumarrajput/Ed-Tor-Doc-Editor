import { DocDataContext } from "@/Context/Context";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Clipboard } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { ConvexClient } from "@/App";
import { api } from "../../../convex/_generated/api";
import { Input } from "../ui/input";
import { GetSharedURL } from "@/Utils/Utils";

function Share() {
  const [isPublished, setisPublished] = useState(false);
  const { documentId, user, docData }: any = useContext(DocDataContext);

  const sharableURL = GetSharedURL(documentId);

  const CopytoClipBoard = () => {
    navigator.clipboard.writeText(sharableURL);
  };

  useEffect(() => {
    setisPublished(docData.isPublished);
  }, [docData]);

  const TogglePublish = async () => {
    await ConvexClient.mutation(api.Documents.UpdateDocumentsData, {
      uid: user.uid || "",
      key: "isPublished",
      value: !isPublished,
      id: documentId,
    });
    setisPublished((value) => !value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Share</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-2 items-center justify-center text-center">
          {isPublished ? (
            <div className="flex gap-2 justify-center">
              <Input value={sharableURL} disabled />
              <Button size={"icon"} onClick={CopytoClipBoard}>
                <Clipboard />
              </Button>
            </div>
          ) : (
            <h2>Published Projects can be shared via URL</h2>
          )}
          <Button onClick={TogglePublish}>
            {isPublished ? `Unpublish` : `Publish`}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Share;
