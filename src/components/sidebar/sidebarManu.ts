import * as Icon from "lucide-react";

export const menuData = {
  teams: [
    {
      name: "Project Phoenix",
      logo: "#",
      slug: "project-phoenix",
    },
    {
      name: "Marketing Campaign",
      logo: "#",
      slug: "marketing-campaign",
    },
    {
      name: "Personal Tasks",
      logo: "#",
      slug: "personal-tasks",
    },
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/[slug]",
      icon: Icon.LayoutDashboard,
      asChild: false,
    },
    {
      title: "Inbox",
      url: "/[slug]/inbox",
      icon: Icon.Inbox,
      asChild: false,
    },
    {
      title: "Tickets",
      url: "/[slug]/tickets",
      icon: Icon.Ticket,
      asChild: false,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Icon.Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: Icon.HelpCircle,
    },
  ],
};

export const getNavUrl = (baseUrl: string, slug: string) => {
  return baseUrl.replace("[slug]", slug);
};
