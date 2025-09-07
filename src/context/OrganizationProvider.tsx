import { createContext, useContext, useState, useEffect } from "react";
import { LocalStorageManager } from "@/utils";
import { TokenManager } from "@/context/TokenManager";

import api from "@/lib/api";

interface OrganizationContextType {
  organizationAll: Organization[] | null;
  setOrganizationAll: (org: Organization[] | null) => void;
  organization: Organization | null;
  setOrganizationBySlug: (slug: string) => Promise<void>;
  fetchSelectedOrganization: () => Promise<void>;
  getCurrentSlug: () => string | null;
  loading: boolean;
  error: string | null;
}

interface Organization {
  organization_id: number;
  organization_name: string;
  slug: string;
  user_id: number;
  name: string;
  description: string;
  is_default: boolean;
  is_preview: true;
  can_manage_organization: true;
  can_manage_members: true;
  can_manage_projects: true;
  can_create_projects: true;
  can_view_all_projects: true;
  can_manage_tasks: true;
  can_view_reports: true;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

export function OrganizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [organizationAll, setOrganizationAll] = useState<Organization[] | null>(
    null
  );
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = TokenManager.getToken();

  const fetchOrganization = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/organization");
      setOrganizationAll(response.data.data.data);
    } catch (error) {
      console.error("Error fetching organization:", error);
      setError("Failed to load organizations");
      setOrganizationAll([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedOrganization = async () => {
    let slug = LocalStorageManager.get<string>("org_slug");
    if (!slug && organizationAll && organizationAll.length > 0) {
      slug = organizationAll[0].slug;
      LocalStorageManager.set("org_slug", slug);
    }
    if (slug) {
      try {
        const response = await api.get(`/organization?slug=${slug}`);
        setOrganization(response.data.data.data[0]);
      } catch (error) {
        setOrganization(null);
      }
    } else {
      fetchOrganization();
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrganization();
    }
  }, []);

  useEffect(() => {
    if (organizationAll !== null && token) {
      fetchSelectedOrganization();
    }
  }, [organizationAll]);

  const setOrganizationBySlug = async (slug: string) => {
    LocalStorageManager.set("org_slug", slug);
    try {
      const response = await api.get(`/organization?slug=${slug}`);
      const orgData = response.data.data.data[0];
      if (orgData) {
        setOrganization(orgData);
      } else {
        setOrganization(null);
        console.warn(`Organization with slug "${slug}" not found`);
      }
    } catch (error) {
      console.error("Error fetching organization by slug:", error);
      setOrganization(null);
    }
  };

  const getCurrentSlug = (): string | null => {
    return LocalStorageManager.get<string>("org_slug");
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizationAll,
        setOrganizationAll,
        organization,
        setOrganizationBySlug,
        fetchSelectedOrganization,
        getCurrentSlug,
        loading,
        error,
      }}
    >
      {(organizationAll && organization) && children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error(
      "useOrganization must be used within an OrganizationProvider"
    );
  }
  return context;
}
