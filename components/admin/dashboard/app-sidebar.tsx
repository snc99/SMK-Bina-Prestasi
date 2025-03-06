"use client";

import * as React from "react";
import { usePathname } from "next/navigation"; // Menggunakan usePathname dari next/navigation
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/admin/dashboard/nav-main";
import { NavUser } from "@/components/admin/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const pathname = usePathname(); // Menggunakan usePathname untuk mendapatkan path URL aktif

  const userData = {
    name: session?.user?.name || "Admin",
    email: session?.user?.email || "admin@example.com",
    avatar: "/avatars/default.jpg",
  };

  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: SquareTerminal,
      isActive: pathname === "/dashboard/admin",
    },
    {
      title: "Pendaftaran",
      url: "",
      icon: Bot,
      isActive:
        pathname.includes("/dashboard/admin/registrations") ||
        pathname.includes("/dashboard/admin/verification"),
      items: [
        {
          title: "List Pendaftar",
          url: "/dashboard/admin/registrations",
        },
        {
          title: "Verifikasi Pendaftar",
          url: "/dashboard/admin/verification",
        },
      ],
    },
    {
      title: "Seleksi",
      url: "#",
      icon: BookOpen,
      isActive:
        pathname.includes("/dashboard/admin/selection-status") ||
        pathname.includes("/dashboard/admin/students-results"),
      items: [
        {
          title: "Daftar Seleksi Siswa",
          url: "/dashboard/admin/students-results",
        },
        {
          title: "Verifikasi Seleksi",
          url: "/dashboard/admin/selection-status",
        },
      ],
    },
    {
      title: "Export & Laporan",
      url: "#",
      icon: Settings2,
      isActive:
        pathname.includes("/dashboard/admin/export") ||
        pathname.includes("/dashboard/admin/report"),
      items: [
        {
          title: "Export",
          url: "/dashboard/admin/export",
        },
        {
          title: "Report",
          url: "/dashboard/admin/report",
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
