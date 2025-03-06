"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

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
  ];

  return (
    <>
      {/* Header/Navbar */}
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
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <li key={item.to} className="list-none">
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
            {/* Tombol Login */}
            <Link
              href="/auth/login"
              className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-1"
            >
              Login
              <LogIn size={18} className="relative top-[1px]" />
            </Link>
          </nav>

          {/* Hamburger Menu */}
          <button className="lg:hidden" onClick={toggleMenu}>
            <span className="text-2xl">&#9776;</span>
          </button>
        </div>
      </motion.header>

      {/* Overlay saat sidebar terbuka */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sidebar Mobile */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 w-64 h-full bg-blue-600 text-white shadow-lg lg:hidden z-50"
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
          {/* Tombol Login di Sidebar */}
          <Link
            href="/auth/login"
            className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-1"
          >
            Login
            <LogIn size={18} className="relative top-[1px]" />
          </Link>
        </ul>
      </motion.div>
    </>
  );
};

export default Header;
