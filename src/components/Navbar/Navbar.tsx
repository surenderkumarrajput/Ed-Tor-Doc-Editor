import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import useScrollTop from "@/hooks/useScrollTop";
import Logo from "./Logo";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Spinner } from "../Loading/Spinner";
import { ModeToggle } from "../ModeToggle/ModeToggle";

function Navbar() {
  const isScrolled = useScrollTop({ threshold: 10 });
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div
      className={cn(
        "sticky top-0 w-full px-2 h-14 flex justify-between items-center bg-background z-10",
        isScrolled &&
          "border-b shadow-sm  shadow-[rgba(0,0,0,0.45)] dark:shadow-[rgba(255,255,255,0.45)]"
      )}
    >
      <Link to={"/"}>
        <Logo />
      </Link>
      <div className="flex gap-2 items-center">
        {isLoaded ? (
          isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Button asChild>
              <SignInButton
                mode="modal"
                afterSignUpUrl={"/dashboard"}
                afterSignInUrl={"/dashboard"}
              >
                Sign In
              </SignInButton>
            </Button>
          )
        ) : (
          <Spinner size={"lg"} />
        )}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
