"use client";

import * as React from "react";
import { usePathname } from "next/navigation"; // Menggunakan usePathname dari next/navigation
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/admin/dashboard/nav-main";
import { NavUser } from "@/components/admin/dashboard/nav-user";
import { TeamSwitcher } from "@/components/admin/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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

  const teams = [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ];

  const navMain = [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: pathname === "/dashboard/admin/statistics", // Aktifkan jika URL sesuai
      items: [
        {
          title: "Statistik Pendaftaran",
          url: "/dashboard/admin/statistics",
        },
      ],
    },
    {
      title: "Pendaftaran",
      url: "",
      icon: Bot,
      isActive:
        pathname.includes("/dashboard/admin/registrations") ||
        pathname.includes("/dashboard/admin/verification"), // Cek apakah URL sesuai
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
      title: "Laporan & Export",
      url: "#",
      icon: Settings2,
      isActive:
        pathname.includes("/dashboard/admin/export-pdf") ||
        pathname.includes("/dashboard/admin/export-excel"),
      items: [
        {
          title: "Export ke PDF",
          url: "/dashboard/admin/export-pdf",
        },
        {
          title: "Export ke Excel",
          url: "/dashboard/admin/export-excel",
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
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
