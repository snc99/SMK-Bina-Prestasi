const Footer = () => {
    return (
        <footer id="footer" className="py-8 bg-gray-900 text-white">
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
    );
};

export default Footer;