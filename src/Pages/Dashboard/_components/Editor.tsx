import { DocDataContext } from "@/Context/Context";
import { useTheme } from "@/Providers/Provider";
import { GetRandomColor } from "@/Utils/Utils";
import {
  BlockNoteEditor,
  uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@blocknote/core";
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useContext, useEffect, useMemo } from "react";
import YPartyKitProvider from "y-partykit/provider";
import { Doc } from "yjs";

type EditorType = {
  editable: boolean;
  onChange: (value: string) => void;
  initialContent: string;
};

function Editor({ editable, onChange, initialContent }: EditorType) {
  const { theme } = useTheme();
  const { user, documentId }: any = useContext(DocDataContext);

  const { doc, provider } = useMemo(() => {
    const doc = new Doc();
    const provider = editable
      ? new YPartyKitProvider(
          "wss://blocknote-dev.yousefed.partykit.dev",
          documentId,
          doc
        )
      : null;
    return { doc, provider };
  }, []);
  const editor: BlockNoteEditor = useBlockNote({
    collaboration: provider
      ? {
          provider: provider,
          fragment: doc.getXmlFragment("document-store"),
          user: {
            name: user?.fullName,
            color: GetRandomColor(),
          },
        }
      : undefined,
    editable,
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  return (
    <BlockNoteView
      className="w-full h-full [&>*:first-child]:h-full [&>*:first-child]:bg-background
     "
      editor={editor}
      content={initialContent ? JSON.parse(initialContent) : undefined}
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
}

export default Editor;
