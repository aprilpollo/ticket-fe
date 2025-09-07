import { PublicRoute } from "@/hooks/protected";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
      <PublicRoute>
        <Outlet />
      </PublicRoute>
  );
}
