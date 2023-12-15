import { useTheme } from "@/Providers/Provider";
import {
  BlockNoteEditor,
  uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@blocknote/core";
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

type EditorType = {
  editable: boolean;
  onChange: (value: string) => void;
  initialContent: string;
};

function Editor({ editable, onChange, initialContent }: EditorType) {
  const { theme } = useTheme();

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
    initialContent: initialContent ? JSON.parse(initialContent) : null,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });
  return (
    <div>
      <BlockNoteView
        className="w-full h-full [&>*:first-child]:h-full [&>*:first-child]:bg-background"
        editor={editor}
        theme={theme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}

export default Editor;
