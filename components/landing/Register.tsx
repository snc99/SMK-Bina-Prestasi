import Link from "next/link";

const Register = () => {
  return (
    <section
      id="register"
      className="py-16 bg-blue-600 text-white min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">Pendaftaran Siswa Baru</h2>
        <p className="mt-4 text-lg">
          Siapkan dirimu untuk bergabung dengan SMK Bina Prestasi. Pendaftaran
          dibuka sekarang!
        </p>
        <Link
          href="/register"
          className="mt-6 inline-block bg-yellow-400 text-gray-800 py-2 px-6 rounded-full hover:bg-yellow-300"
        >
          Daftar Sekarang
        </Link>
      </div>
    </section>
  );
};

export default Register;
