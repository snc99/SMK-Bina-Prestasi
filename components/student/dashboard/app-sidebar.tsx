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

import { NavMain } from "@/components/student/dashboard/nav-main";
import { NavUser } from "@/components/student/dashboard/nav-user";
import { TeamSwitcher } from "@/components/student/dashboard/team-switcher";
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
    name: session?.user?.name || "Student",
    nisn: session?.user?.nisn || "student@example.com",
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
      title: "Beranda",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Status Pendaftaran",
          url: "#",
        },
        {
          title: "Informasi Pengumuman",
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
          title: "Formulir Pendaftaran (Isi & Kirim Formulir)",
          url: "#",
        },
        {
          title: "Cek Status Pendaftaran (Terverifikasi / Ditolak)",
          url: "#",
        },
      ],
    },
    {
      title: "Hasil Seleksi",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Pengumuman Kelulusan (Lulus / Tidak Lulus)",
          url: "#",
        },
      ],
    },
    {
      title: "Bantuan (Opsional, jika ada kontak admin/sekolah)",
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
