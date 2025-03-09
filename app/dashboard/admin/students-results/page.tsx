import StudentList from "./components/StudentList";

export default function StudentResult() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Siswa Lulus</h1>
      <StudentList />
    </div>
  );
}
