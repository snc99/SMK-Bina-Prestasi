import { Button } from "@/components/ui/button";

interface SelectionButtonProps {
  studentId: string;
  handleSelect: (id: string, status: "LULUS" | "TIDAK LULUS") => void;
}

const SelectionButton: React.FC<SelectionButtonProps> = ({
  studentId,
  handleSelect,
}) => {
  return (
    <div className="flex gap-2 justify-center">
      <Button
        className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-md"
        onClick={() => handleSelect(studentId, "LULUS")}
      >
        Lolos
      </Button>
      <Button
        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
        onClick={() => handleSelect(studentId, "TIDAK LULUS")}
      >
        Tidak Lolos
      </Button>
    </div>
  );
};

export default SelectionButton;
