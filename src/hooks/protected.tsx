
import type { ReactNode } from "react";
import { Navigate, useParams } from "react-router";
import { useAuth } from "@/context/AuthProvider";
import { useOrganization } from "@/context/OrganizationProvider";


export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { organizationAll } = useOrganization();
  const { slug } = useParams<{ slug: string }>();

  // check slug in organizationAll
  if (organizationAll && slug) {
    const orgExists = organizationAll.some((org) => org.slug === slug);
    if (!orgExists) {
      return <Navigate to="/not-found" replace />;
    }
  }
  
  return user ? children : <Navigate to="/auth/signin" />;
}

export function PublicRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" />;
}
