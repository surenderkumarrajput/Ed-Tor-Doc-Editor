import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import useScrollTop from "@/hooks/useScrollTop";
import { Link } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import Logo from "@/components/Navbar/Logo";
import { ModeToggle } from "@/components/ModeToggle/ModeToggle";

function DashboardNavBar() {
  const isScrolled = useScrollTop({ threshold: 10 });
  return (
    <div
      className={cn(
        "sticky top-0 w-full px-2 h-14 flex justify-between items-center bg-background  z-10",
        isScrolled &&
          "border-b shadow-sm  shadow-[rgba(0,0,0,0.45)] dark:shadow-[rgba(255,255,255,0.45)]"
      )}
    >
      <div className="flex gap-2 items-center">
        <Link to={"/"} className="hidden lg:block">
          <Logo />
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => {}}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <ModeToggle />
      </div>
    </div>
  );
}

export default DashboardNavBar;
