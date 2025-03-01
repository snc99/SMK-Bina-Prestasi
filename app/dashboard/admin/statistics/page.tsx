import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Layout() {
  const dataJurusan = [
    { jurusan: "Teknik Informatika", total: 120 },
    { jurusan: "Akuntansi", total: 80 },
    { jurusan: "Desain Grafis", total: 65 },
    { jurusan: "Administrasi Bisnis", total: 40 },
    { jurusan: "Manajemen", total: 55 },
  ];
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataJurusan.map((item, index) => (
          <Card
            key={index}
            className="w-full bg-white shadow-lg rounded-lg border border-gray-200"
          >
            <CardHeader>
              <CardTitle>{item.jurusan}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">
                Total Pendaftar: {item.total}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
