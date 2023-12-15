import Editor from "./Editor";

type MainContentType = {
  isEditable: boolean;
  pageMode: boolean;
};

function MainContent({ isEditable = true, pageMode = false }: MainContentType) {
  return (
    <Editor
      editable={isEditable}
      onChange={(e) => {
        console.log(e);
      }}
      initialContent=""
    />
  );
}

export default MainContent;
