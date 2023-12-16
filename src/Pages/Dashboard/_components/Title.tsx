import { DocDataContext } from "@/Context/Context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useRef, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { ConvexClient } from "@/App";

function Title() {
  const [isEditing, setisEditing] = useState(false);
  const { docData, documentId, user }: any = useContext(DocDataContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const EnableEditing = () => {
    setisEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const DisableEditing = () => {
    setisEditing(false);
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const change = e.target.value || "Untitled";
    await ConvexClient.mutation(api.Documents.UpdateDocumentsData, {
      id: documentId,
      key: "title",
      value: change,
      uid: user.id,
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      DisableEditing();
    }
  };

  return (
    <div>
      {docData?._id ? (
        isEditing ? (
          <Input
            ref={inputRef}
            placeholder={docData?.title || "Untitled"}
            className="focus-visible:ring-transparent"
            onBlur={DisableEditing}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onClick={EnableEditing}
          />
        ) : (
          <Button variant={"ghost"} onClick={EnableEditing}>
            {docData?.title}
          </Button>
        )
      ) : (
        <h2 className="cursor-default">Documents</h2>
      )}
    </div>
  );
}

export default Title;
