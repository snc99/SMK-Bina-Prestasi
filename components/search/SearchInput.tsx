"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({
  placeholder = "Cari...",
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";

  // Fungsi menangani perubahan input pencarian
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newUrl = value ? `${pathname}?search=${value}` : pathname;
    router.replace(newUrl);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      defaultValue={search} // Ambil dari URL
      onChange={handleSearchChange}
      className="border p-2 rounded w-full mb-4"
    />
  );
}
