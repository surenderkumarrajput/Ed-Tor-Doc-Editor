import { ClerkProvider } from "@clerk/clerk-react";
import "./App.scss";
import CustomRoutes from "./CustomRoutes/CustomRoutes";
import { ThemeProvider } from "./Providers/Provider";
import { ConvexProvider, ConvexReactClient } from "convex/react";

if (!process.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
if (!process.env.VITE_CONVEX_URL) {
  throw new Error("Missing Convex Publishable Key");
}
export const ConvexClient = new ConvexReactClient(process.env.VITE_CONVEX_URL);
const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="h-screen">
        <ConvexProvider client={ConvexClient}>
          <ClerkProvider publishableKey={publishableKey}>
            <CustomRoutes />
          </ClerkProvider>
        </ConvexProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
