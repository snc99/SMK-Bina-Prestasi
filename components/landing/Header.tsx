"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const pathname = usePathname(); // Cek halaman saat ini

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Data menu
  const menuItems = [
    { name: "Home", to: "hero", path: "/" },
    { name: "Tentang", to: "about", path: "/" },
    { name: "Jurusan", to: "majors", path: "/" },
    { name: "Pendaftaran", to: "register", path: "/" },
    { name: "Kontak", to: "footer", path: "/" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolling ? "bg-blue-800 shadow-md" : "bg-blue-600"
        } text-white py-4`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-xl font-bold">SMK Bina Prestasi</div>

          {/* Menu Desktop */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-6">
              {menuItems.map((item) => (
                <li key={item.to}>
                  {pathname === "/" && item.path === "/" ? (
                    <ScrollLink
                      to={item.to}
                      smooth={true}
                      duration={800}
                      spy={true}
                      activeClass="text-yellow-300"
                      className="cursor-pointer hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                    </ScrollLink>
                  ) : (
                    <Link
                      href={item.path}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger Menu */}
          <button className="lg:hidden" onClick={toggleMenu}>
            <span className="text-2xl">&#9776;</span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 right-0 w-64 h-full bg-blue-600 text-white shadow-lg lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <button
          className="absolute top-5 right-5 text-2xl"
          onClick={toggleMenu}
        >
          ✕
        </button>
        <ul className="flex flex-col items-center mt-16 space-y-6">
          {menuItems.map((item) => (
            <li key={item.to}>
              {pathname === "/" && item.path === "/" ? (
                <ScrollLink
                  to={item.to}
                  smooth={true}
                  duration={800}
                  spy={true}
                  activeClass="text-yellow-300"
                  className="cursor-pointer hover:text-gray-300 transition-colors"
                  onClick={toggleMenu}
                >
                  {item.name}
                </ScrollLink>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-gray-300 transition-colors"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default Header;
