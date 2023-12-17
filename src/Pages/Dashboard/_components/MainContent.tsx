import Loading from "@/components/Loading/Loading";
import { useContext } from "react";
import { DocDataContext } from "@/Context/Context";
import { ConvexClient } from "@/App";
import { api } from "../../../../convex/_generated/api";
import DocNotFound from "@/components/DocNotFound/DocNotFound";
import Editor from "./Editor";

type MainContentType = {
  isEditable: boolean;
  pageMode: boolean;
};

function MainContent({ isEditable = true, pageMode = false }: MainContentType) {
  const { documentContentId, docData, documentLoading }: any =
    useContext(DocDataContext);

  const UpdateDocuments = async (e: string) => {
    return await ConvexClient.mutation(
      api.Documents.UpdateDocumentsContentData,
      {
        id: documentContentId,
        value: e,
      }
    );
  };

  if (documentLoading) {
    return <Loading />;
  }

  if (!documentContentId || !docData?.authorised) {
    return <DocNotFound pageMode={pageMode} />;
  }
  return (
    <Editor
      editable={isEditable}
      initialContent={docData?.content}
      onChange={async (e) => {
        await UpdateDocuments(e);
      }}
    />
  );
}

export default MainContent;
