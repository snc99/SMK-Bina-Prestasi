"use client";

import * as React from "react";
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
  // 🔥 Perbaikan: Pindahkan useSession ke dalam komponen
  const { data: session } = useSession();

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
      isActive: true,
      items: [
        {
          title: "Statistik Pendaftaran",
          url: "#",
        },
        {
          title: "Ringkasan Status Pendaftar",
          url: "#",
        },
      ],
    },
    {
      title: "Pendaftaran",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "List Pendaftar",
          url: "#",
        },
        {
          title: "Verifikasi Pendaftar",
          url: "#",
        },
      ],
    },
    {
      title: "Seleksi",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Kelola Hasil Seleksi",
          url: "#",
        },
        {
          title: "Data Siswa Lulus",
          url: "#",
        },
      ],
    },
    {
      title: "Laporan & Export",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Export ke PDF",
          url: "#",
        },
        {
          title: "Export ke Excel",
          url: "#",
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
