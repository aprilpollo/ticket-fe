import { createBrowserRouter } from "react-router";
//Layout
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

//Pages
import RootRedirectPage from "@/pages/RootRedirectPage";
import HomePage from "@/pages/HomePage";
import TicketsPage from "@/pages/TicketsPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: RootRedirectPage,
  },
  {
    path: "/not-found",
    Component: NotFoundPage,
  },
  {
    path: "/:slug",
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "tickets", Component: TicketsPage },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { path: "signin", Component: SignInPage },
      { path: "signup", Component: SignUpPage },
    ],
  },
]);
