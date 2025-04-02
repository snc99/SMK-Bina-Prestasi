"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    setSearch(searchParams.get("search") || ""); 
  }, [searchParams]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const newUrl = search ? `${pathname}?search=${encodeURIComponent(search)}` : pathname;
      router.replace(newUrl);
    }, 500);

    return () => clearTimeout(delayDebounce); 
  }, [search, pathname, router]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={search} // Gunakan value agar reaktif
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 rounded w-full mb-4"
    />
  );
}
