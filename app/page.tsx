"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">SMK Bina Prestasi</div>
          <nav className="lg:block hidden">
            <ul className="flex space-x-6">
              <li>
                <a href="#home" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#jurusan" className="hover:text-gray-300">
                  Jurusan
                </a>
              </li>
              <li>
                <a href="#pendaftaran" className="hover:text-gray-300">
                  Pendaftaran
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-gray-300">
                  Kontak
                </a>
              </li>
            </ul>
          </nav>
          {/* Hamburger */}
          <button className="lg:hidden" onClick={toggleMenu}>
            <span className="text-2xl">&#9776;</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${
          isOpen ? "block" : "hidden"
        } bg-blue-600 text-white py-4`}
      >
        <ul className="space-y-4 text-center">
          <li>
            <a
              href="#home"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#jurusan"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Jurusan
            </a>
          </li>
          <li>
            <a
              href="#pendaftaran"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Pendaftaran
            </a>
          </li>
          <li>
            <a
              href="#kontak"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Kontak
            </a>
          </li>
        </ul>
      </div>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-blue-500 text-white py-20 min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Selamat datang di SMK Bina Prestasi
          </h1>
          <p className="mt-4 text-lg">
            Pendidikan Berkualitas untuk Masa Depan Gemilang
          </p>
          <a
            href="#pendaftaran"
            className="mt-6 inline-block bg-yellow-400 text-gray-800 py-2 px-6 rounded-full hover:bg-yellow-300"
          >
            Daftar Sekarang
          </a>
        </div>
        <div className="absolute top-0 right-0 w-full h-full">
          <Image
            src="https://placehold.co/600x400/png"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
      </section>

      {/* Tentang Sekolah */}
      <section
        id="tentang"
        className="py-16 bg-gray-100 min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Tentang SMK Bina Prestasi</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            SMK Bina Prestasi adalah sekolah menengah kejuruan yang menawarkan
            pendidikan berkualitas di berbagai jurusan untuk mempersiapkan siswa
            menjadi profesional di bidangnya.
          </p>
        </div>
      </section>

      {/* Jurusan */}
      <section
        id="jurusan"
        className="py-16 min-h-screen bg-white flex items-center justify-center"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Jurusan Kami</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Jurusan 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold">
                  Teknik Komputer Jaringan
                </h3>
                <p className="mt-2 text-gray-600">
                  Pelajari cara mengelola jaringan komputer dan perangkat keras
                  untuk menjadi ahli di bidangnya.
                </p>
              </div>
            </div>
            {/* Jurusan 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold">
                  Rekayasa Perangkat Lunak
                </h3>
                <p className="mt-2 text-gray-600">
                  Mempelajari pembuatan dan pengembangan perangkat lunak dengan
                  teknologi terbaru.
                </p>
              </div>
            </div>
            {/* Jurusan 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold">Multimedia</h3>
                <p className="mt-2 text-gray-600">
                  Kuasai seni desain grafis, video editing, dan produksi
                  multimedia untuk berkarir di industri kreatif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pendaftaran */}
      <section
        id="pendaftaran"
        className="py-16 bg-blue-600 text-white min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Pendaftaran Siswa Baru</h2>
          <p className="mt-4 text-lg">
            Siapkan dirimu untuk bergabung dengan SMK Bina Prestasi. Pendaftaran
            dibuka sekarang!
          </p>
          <a
            href="#kontak"
            className="mt-6 inline-block bg-yellow-400 text-gray-800 py-2 px-6 rounded-full hover:bg-yellow-300"
          >
            Daftar Sekarang
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 SMK Bina Prestasi | Semua Hak Dilindungi</p>
          <div className="mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="mx-2 text-gray-400 hover:text-white"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="mx-2 text-gray-400 hover:text-white"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="mx-2 text-gray-400 hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
