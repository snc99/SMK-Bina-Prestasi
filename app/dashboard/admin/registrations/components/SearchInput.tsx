"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce"; // Buat hook useDebounce

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({
  placeholder = "Cari...",
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search, 500); // Gunakan debounce

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const newUrl = debouncedSearch
      ? `${pathname}?search=${encodeURIComponent(debouncedSearch)}`
      : pathname;
    router.replace(newUrl);
  }, [debouncedSearch, pathname, router]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 rounded w-full mb-4"
    />
  );
}