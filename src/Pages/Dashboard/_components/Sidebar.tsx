import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

function SideBar() {
  const sideBarClassname = cn(
    `
      fixed
      left-0

      z-[2]
      p-2
      lg:left-auto
      lg:static
      bg-background
      rounded-md
      h-full
       w-full
      min-w-[300px] 
      flex-[1] 
      space-y-2
      overflow-y-auto
      flex-col
      items-center
     `,
    `${true ? "flex" : "hidden"}`,
    `lg:flex`
  );

  const onCreate = async () => {};
  const onDelete = async () => {};

  return (
    <div className={sideBarClassname}>
      <div className="flex justify-center gap-4 w-full">
        <Button className="w-1/2" onClick={onCreate}>
          New Doc
          <Plus size={20} />
        </Button>
      </div>

      {Array.from({ length: 5 })?.map((e, index) => (
        <li className="w-full flex" key={index}>
          <Button
            variant={"ghost"}
            asChild
            className="w-full justify-start"
            onClick={() => {}}
          >
            <h2>{index}</h2>
          </Button>
          <Button
            variant={"ghost"}
            className="rounded-xl"
            onClick={() => {
              onDelete();
            }}
            size={"icon"}
          >
            <Trash />
          </Button>
        </li>
      ))}
    </div>
  );
}

export default SideBar;
