"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Contoh data yang akan ditampilkan di tabel
const pendaftarData = [
  {
    id: "1",
    name: "John Doe",
    nisn: "1234567890",
    ijazahNumber: "9876543210",
    schoolOrigin: "SMA Negeri 1",
    major: "Teknik Komputer",
    registrationStatus: "Terverifikasi",
    selectionStatus: "Lulus",
  },
  {
    id: "2",
    name: "Jane Smith",
    nisn: "0987654321",
    ijazahNumber: "1122334455",
    schoolOrigin: "SMA Negeri 2",
    major: "Manajemen",
    registrationStatus: "Ditolak",
    selectionStatus: "Tidak Lulus",
  },
  // Tambah data lainnya sesuai kebutuhan
];

export default function Verification() {
  const [data, setData] = useState(pendaftarData);

  const handleVerify = (id: string) => {
    // Logika untuk memverifikasi pendaftar berdasarkan NISN/No Ijazah
    alert(`Verifikasi pendaftar dengan ID: ${id}`);
  };

  const handleSelect = (id: string, status: string) => {
    // Logika untuk menandai hasil seleksi
    alert(`Pendaftar dengan ID ${id} dinyatakan ${status}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Status Pendaftar</h1>
      <div className="overflow-x-auto rounded-md">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-100 text-gray-700">
            <TableRow>
              <TableHead className="w-[50px] text-xs">No</TableHead>
              <TableHead className="w-[100px] text-xs">Nama</TableHead>
              <TableHead className="w-[100px] text-xs">NISN</TableHead>
              <TableHead className="w-[100px] text-xs">Nomor Ijazah</TableHead>
              <TableHead className="w-[100px] text-xs">Asal Sekolah</TableHead>
              <TableHead className="w-[100px] text-xs">Jurusan</TableHead>
              <TableHead className="w-[150px] text-xs">
                Status Pendaftaran
              </TableHead>
              <TableHead className="w-[100px] text-xs text-center">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((pendaftar, index) => (
              <TableRow key={pendaftar.id}>
                <TableCell className="w-[50px] text-xs">{index + 1}</TableCell>
                <TableCell className="w-[100px] text-xs">
                  {pendaftar.name}
                </TableCell>
                <TableCell className="w-[130px] text-xs">
                  {pendaftar.nisn}
                </TableCell>
                <TableCell className="w-[130px] text-xs">
                  {pendaftar.ijazahNumber}
                </TableCell>
                <TableCell className="w-[130px] text-xs">
                  {pendaftar.schoolOrigin}
                </TableCell>
                <TableCell className="w-[130px] text-xs">
                  {pendaftar.major}
                </TableCell>
                <TableCell className="w-[100px] text-xs">
                  {pendaftar.registrationStatus}
                </TableCell>

                <TableCell className="w-[100px] text-xs">
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleVerify(pendaftar.id)}
                      variant="outline"
                      size="sm"
                      className="mr-2 text-xs"
                    >
                      Verifikasi
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
