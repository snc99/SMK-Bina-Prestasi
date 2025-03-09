import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function ErrorServer() {
  return (
    <>
      <div className="flex justify-center items-center h-60">
        <Alert
          variant="destructive"
          className="max-w-md border-red-600 bg-red-100 text-red-900 shadow-md flex items-center gap-4 p-4"
        >
          <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
          <div className="flex-1">
            <AlertTitle className="text-red-800">Server Error</AlertTitle>
            <AlertDescription className="text-red-700">
              Terjadi kesalahan pada server. Silakan coba lagi nanti atau
              hubungi administrator jika masalah berlanjut.
            </AlertDescription>
          </div>
        </Alert>
      </div>
    </>
  );
}
