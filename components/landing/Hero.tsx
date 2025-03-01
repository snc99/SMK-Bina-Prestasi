import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="hero"
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
  );
};
export default Hero;
