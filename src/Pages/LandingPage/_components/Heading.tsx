import { Spinner } from "@/components/Loading/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Heading() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div
      className="
      text-center
      w-full 
      max-w-sm
      md:max-w-3xl 
      font-bold
      space-y-2 md:space-y-4"
    >
      <h2 className="text-dm md:text-2xl lg:text-3xl">
        Your Ideas,Documents & Plans. Unified
      </h2>
      <h1 className="text-2xl md:text-4xl lg:text-5xl">
        Welcome to <span className="underline">Ed-Tor</span>
      </h1>
      <h3 className="text-base font-medium">
        Ed-Tor is Collaborative workspace where better faster work happens.
      </h3>
      {isLoaded ? (
        isSignedIn ? (
          <Button asChild>
            <Link to={"/dashboard"}>
              Explore
              <ArrowRight size={20} />
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <SignInButton
              mode="modal"
              afterSignUpUrl="/dashboard"
              afterSignInUrl="/dashboard"
            >
              Get Ed-Tor
            </SignInButton>
          </Button>
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      )}
    </div>
  );
}

export default Heading;
