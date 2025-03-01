import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placehold.co"], // Menambahkan placeholder.com ke daftar domain yang diperbolehkan
  },
};

export default nextConfig;
