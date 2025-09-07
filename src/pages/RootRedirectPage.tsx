import { Navigate } from "react-router";
import { LocalStorageManager } from "@/utils";
import { useOrganization } from "@/context/OrganizationProvider";

export default function RootRedirectPage() {
  const { organizationAll, loading } = useOrganization();
  if (loading) {
    return null;
  }

  const savedSlug = LocalStorageManager.get<string>("org_slug");
  
  if (savedSlug) {
    return <Navigate to={`/${savedSlug}`} replace />;
  }
  
  if (organizationAll && organizationAll.length > 0) {
    const firstOrgSlug = organizationAll[0].slug;
    LocalStorageManager.set("org_slug", firstOrgSlug);
    return <Navigate to={`/${firstOrgSlug}`} replace />;
  }

  return <Navigate to="/auth/signin" replace />;
}
