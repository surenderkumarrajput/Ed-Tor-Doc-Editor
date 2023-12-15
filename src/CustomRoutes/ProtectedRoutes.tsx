import Loading from "@/components/Loading/Loading";
import { useUser } from "@clerk/clerk-react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <Loading />;
  }
  if (!isSignedIn) {
    return <Navigate to={"/"} />;
  }

  return <div>{children}</div>;
}

export default ProtectedRoutes;
