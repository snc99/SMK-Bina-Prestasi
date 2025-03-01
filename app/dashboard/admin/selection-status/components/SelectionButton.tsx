"use client";

import { mutate } from "swr";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { updateSelectionStatus } from "../actions/fetchStudents";

interface SelectionButtonProps {
  studentId: string;
}

export default function SelectionButton({ studentId }: SelectionButtonProps) {
  const handleSelect = async (status: "LULUS" | "TIDAK LULUS") => {
    const result = await updateSelectionStatus(studentId, status);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Status seleksi berhasil diperbarui.");
      mutate("/api/students"); // Refresh data
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="default" onClick={() => handleSelect("LULUS")}>
        Lulus
      </Button>
      <Button variant="destructive" onClick={() => handleSelect("TIDAK LULUS")}>
        Tidak Lulus
      </Button>
    </div>
  );
}
