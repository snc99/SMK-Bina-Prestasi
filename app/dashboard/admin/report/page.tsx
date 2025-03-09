import React from "react";

export default function ReportPage() {
  return (
    <div>
      Laporan
      <p>
        Data Pendaftar Daftar semua siswa yang mendaftar, termasuk detail
        seperti:
      </p>
      <p>- Nama</p>
      <p>- NISN</p>
      <p>- Nomor Ijazah </p>
      <p>- Asal Sekolah</p>
      <p>- Jurusan yang dipilih</p>
      <p>- Nomor Telepon</p>
      <p>- Status Akun (yg di verifikasi dan tidak dan pending) </p>
      <p>
        - Filter & Sorting: Berdasarkan status akun (Pending, Lulus, Tidak
        Lulus)
      </p>
      <p>Laporan Hasil Seleksi Daftar siswa yang Lulus dan Tidak Lulus</p>
    </div>
  );
}
