import { useNavigate } from "react-router";
import { ChevronsUpDown, Plus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useOrganization } from "@/context/OrganizationProvider";

export function OrgSwitcher() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { organizationAll, organization, setOrganizationBySlug } = useOrganization();

  if (!organizationAll || !organization || organizationAll.length < 1) {
    return null;
  }

  const handleOrgChange = (org: {
    organization_id: number;
    organization_name: string;
    slug: string;
  }) => {
    navigate(`/${org.slug}`);
    setOrganizationBySlug(org.slug);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center">
                <Avatar className="rounded-lg size-8">
                  <AvatarImage src="#" alt="@evilrabbit" />
                  <AvatarFallback>
                    {organization?.organization_name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase() || "ORG"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {organization?.organization_name || "Select Organization"}
                </span>
                <span className="truncate text-xs">Task Management</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Organization
            </DropdownMenuLabel>
            {organizationAll.map((item, _) => (
              <DropdownMenuItem
                key={item.organization_name}
                onClick={() => handleOrgChange(item)}
                className="gap-2 p-2 cursor-pointer"
              >
                <Avatar className="rounded-lg size-8">
                  <AvatarImage src="#" alt="@evilrabbit" />
                  <AvatarFallback>
                    {item.organization_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">
                  {item.organization_name}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Add Organization
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
