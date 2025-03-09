import StudentList from "./components/StudentList";

export default function ExportPDF() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Export Seleksi</h1>
      <StudentList />
    </div>
  );
}
