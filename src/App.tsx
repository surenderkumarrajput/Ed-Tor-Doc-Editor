import { ClerkProvider } from "@clerk/clerk-react";
import "./App.scss";
import CustomRoutes from "./CustomRoutes/CustomRoutes";
import { ThemeProvider } from "./Providers/Provider";

if (!process.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="h-screen w-screen">
        <ClerkProvider publishableKey={publishableKey}>
          <CustomRoutes />
        </ClerkProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
