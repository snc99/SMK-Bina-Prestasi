import StudentTable from "./components/StudentTable";

export default function ExportPDF() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Export Siswa</h1>
      <StudentTable />
    </div>
  );
}
