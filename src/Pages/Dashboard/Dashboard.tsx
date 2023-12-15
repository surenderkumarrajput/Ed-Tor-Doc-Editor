import { lazy } from "react";
import DashboardNavBar from "./_components/DashboardNavBar";
const MainContent = lazy(() => import("./_components/MainContent"));

import SideBar from "./_components/Sidebar";

function Dashboard() {
  return (
    <div className="relative min-h-full w-full bg-gray-200 dark:bg-neutral-900">
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
  );
}

export default Dashboard;
