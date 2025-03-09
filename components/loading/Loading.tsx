import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-60">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      <p className="text-gray-600 mt-2">Memuat data, harap tunggu...</p>
    </div>
  );
}
