const Majors = () => {
  return (
    <section
      id="majors"
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
  );
};

export default Majors;
