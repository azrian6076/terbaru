import React from 'react';

const StudentDashboard: React.FC = () => {
  return (
    <div className="h-full px-6 py-4">
      {/* Judul */}
      <h1 className="text-3xl font-bold underline text-black mb-4">
        Selamat Datang di Sistem E-Portofolio
      </h1>

      {/* Paragraf */}
      <p className="text-black-700">
        Sistem E-Portofolio Mahasiswa ini adalah platform digital yang memfasilitasi mahasiswa dalam mendokumentasikan dan mengelola seluruh pencapaian akademik maupun non-akademik mereka.
      </p>
      <p className="text-black-700">
        Dengan sistem ini, mahasiswa dapat menyimpan berbagai bukti karya seperti sertifikat, proyek, pengalaman organisasi, dan lainnya dalam satu tempat yang mudah diakses.
      </p>
      <p className="text-black-700">
        Melalui sistem ini, setiap mahasiswa dapat membangun kredibilitas dan profesionalisme secara lebih terstruktur, transparan, dan siap disajikan kepada dosen, fakultas, maupun industri saat diperlukan.
      </p>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-6 rounded-xl text-center">
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm mt-1">Sertifikat</div>
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-6 rounded-xl text-center">
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm mt-1">Project</div>
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-6 rounded-xl text-center">
          <div className="text-2xl font-bold">Aktif</div>
          <div className="text-sm mt-1">Status Mahasiswa</div>
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-6 rounded-xl text-center">
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm mt-1">Organisasi</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
