import StudentList from "./components/StudentList";

export default function RegistrationsPage() {
  return (
    <div className="w-full mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-6">List Pendaftar</h1>
      <div className="mb-4 flex items-end justify-end">
        <input
          type="text"
          placeholder="Cari pendaftar..."
          className="border rounded-lg px-3 py-2 w-1/3"
        />
      </div>

      <StudentList />
    </div>
  );
}
