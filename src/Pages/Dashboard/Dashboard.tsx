import { lazy, useEffect, useMemo, useState } from "react";
import DashboardNavBar from "./_components/DashboardNavBar";
const MainContent = lazy(() => import("./_components/MainContent"));

import SideBar from "./_components/Sidebar";
import { DocDataContext } from "@/Context/Context";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../../convex/_generated/api";

function Dashboard() {
  const { user } = useUser();
  const params = useSearchParams()[0];
  const [sideBarOpen, setsideBarOpen] = useState(false);
  const [docIndex, setdocIndex] = useState(-1);
  const [documentLoading, setdocumentLoading] = useState(true);
  const documentId: any = params.get("documentId") || null;
  const [initialUpdate, setinitialUpdate] = useState(false);
  const [currentDocId, setcurrentDocId] = useState(null);
  const documents =
    useQuery(api.Documents.GetDocuments, {
      uid: user?.id,
    }) || null;

  const docData = useMemo(() => {
    if (!documents) {
      return null;
    }
    setTimeout(() => {
      setdocumentLoading(false);
    }, 0);

    return { ...documents[docIndex], authorised: true };
  }, [docIndex, documents]);

  useEffect(() => {
    if (initialUpdate || !documents || currentDocId === documentId) {
      return;
    }
    setcurrentDocId(documentId);
    setinitialUpdate(true);
    setdocumentLoading(true);
    let index = documents?.findIndex((e) => e._id === documentId);

    setdocIndex(index !== undefined ? index : -1);
    if (index === -1 || docIndex === index) {
      setTimeout(() => {
        setdocumentLoading(false);
      }, 0);
    }
  }, [documentId, documents]);

  return (
    <DocDataContext.Provider
      value={{
        documentContentId: docData?.Content_Ref || null,
        documentId,
        user,
        docData,
        setsideBarOpen,
        sideBarOpen,
        documentLoading,
        documents,
      }}
    >
      <div className="relative min-h-screen w-full bg-gray-200 dark:bg-neutral-900">
        <DashboardNavBar />
        <div className="flex h-[calc(100vh-3.5rem)] w-full gap-4 p-2">
          <SideBar />
          <div className="h-full w-full flex-[4] relative flex justify-center">
            <div
              className="
              max-w-[1000px]
              p-2 w-full lg:w-[80%] 
              h-full 
              rounded-md  
              bg-background   
              absolute left-1/2 -translate-x-1/2
              overflow-y-auto 
           "
            >
              <MainContent isEditable={true} pageMode={false} />
            </div>
          </div>
        </div>
      </div>
    </DocDataContext.Provider>
  );
}

export default Dashboard;
