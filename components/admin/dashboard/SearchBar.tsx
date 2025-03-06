import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        placeholder="Cari berdasarkan nama, NISN, atau No. Ijazah..."
        className="border rounded-lg px-3 py-2 w-1/3"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={() => onSearch(query)}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Cari
      </button>
    </div>
  );
}
