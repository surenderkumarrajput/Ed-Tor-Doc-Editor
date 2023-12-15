import Navbar from "@/components/Navbar/Navbar";
import { useUser } from "@clerk/clerk-react";
import MainContent from "../Dashboard/_components/MainContent";

function PageMode() {
  const { user } = useUser();

  return (
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
  );
}

export default PageMode;
