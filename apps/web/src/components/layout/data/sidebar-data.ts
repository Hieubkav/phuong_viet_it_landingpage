import { Image, Layers, LayoutDashboard, Plus } from "lucide-react";
import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
  user: {
    name: "PV-ERP Admin",
    email: "admin@pv-erp.local",
    avatar: "/logo.png",
  },
  teams: [{ name: "PV-ERP", logo: LayoutDashboard, plan: "Dashboard" }],
  navGroups: [
    {
      title: "Trang chủ",
      items: [
        { title: "Tổng quan", url: "/dashboard", icon: LayoutDashboard },
        { title: "Blocks trang chủ", url: "/dashboard/home-blocks", icon: Layers },
        { title: "Tạo block", url: "/dashboard/home-blocks/new", icon: Plus },
        { title: "Media", url: "/dashboard/media", icon: Image },
      ],
    },
  ],
};
