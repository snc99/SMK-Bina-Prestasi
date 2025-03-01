"use client";

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Majors from "@/components/landing/Majors";
import Footer from "@/components/landing/Footer";
import Register from "@/components/landing/Register";

export default function Home() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      <Header />
      <Hero />
      <About />
      <Majors />
      <Register />
      <Footer />
    </div>
  );
}
