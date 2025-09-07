import { RouterProvider } from "react-router";
import { routes } from "@/lib/routes";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { LoaderProvider, Loader } from "@/context/LoaderProvider";
import { OrganizationProvider } from "@/context/OrganizationProvider";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LoaderProvider>
        <Loader />
        <AuthProvider>
          <OrganizationProvider>
            <RouterProvider router={routes} />
          </OrganizationProvider>
        </AuthProvider>
      </LoaderProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
