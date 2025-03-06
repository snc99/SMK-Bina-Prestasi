"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/banner/banner1.svg",
    motto: "Pendidikan Berkualitas untuk Masa Depan Gemilang",
  },
  {
    image: "/banner/banner2.svg",
    motto: "Menjadi Generasi Unggul dan Berprestasi",
  },
  {
    image: "/banner/banner3.svg",
    motto: "SMK Bina Prestasi, Pilihan Terbaik untuk Masa Depan",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0); // Efek Parallax

  // Ganti gambar dan motto setiap 4 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Efek Parallax saat scroll
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.3);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative text-white py-20 min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Slider Gambar */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
            style={{ transform: `translateY(${offset}px)` }} // Efek parallax
          >
            <Image
              src={slides[index].image}
              alt="banner"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay Gelap agar Teks Terbaca */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Teks Hero */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Selamat datang di SMK Bina Prestasi
        </h1>

        {/* Motto berubah sesuai slide */}
        <AnimatePresence mode="wait">
          <motion.p
            key={index} // Motto berubah bersama gambar
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-lg px-6 py-3 rounded-lg drop-shadow-md"
            style={{
              backgroundColor:
                index % 2 === 0
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(30, 58, 138, 0.8)", // Putih / Biru Tua
              color: index % 2 === 0 ? "#1E3A8A" : "#FFFFFF", // Biru Tua / Putih
            }}
          >
            {slides[index].motto}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Indikator Slide */}
      <div className="absolute bottom-5 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
