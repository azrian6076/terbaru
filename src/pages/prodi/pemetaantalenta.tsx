import React, { useState } from 'react';

interface FormData {
  keahlian: string;
  prestasi: string;
  proyekKegiatan: string;
}

const PemetaanTalenta: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    keahlian: '',
    prestasi: '',
    proyekKegiatan: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search criteria:', formData);
    // Add search logic here
  };

  // Dropdown options
  const keahlianOptions = [
    'Pilih keahlian',
    'Pemrograman web (HTML, CSS, JavaScript)',
    'Desain Grafis (Adobe Photoshop)',
    'Analisis Data',
    'Manajemen Proyek',
  ];

  const prestasiOptions = [
    'Pilih prestasi',
    'Juara 1 Lomba Debat Nasional',
    'Penerimaan Beasiswa Unggulan',
    'Juara 3 Karya Tulis Ilmiah',
    'Sertifikat TOEFL di atas 600',
    'Juara 1 Kompetisi Startup Mahasiswa',
  ];

  const proyekKegiatanOptions = [
    'Pilih proyek/kegiatan',
    'Ketua Panitia Seminar',
    'Anggota Tim PKM',
    'Asisten Dosen',
    'Developer Aplikasi Kampus',
    'Tim Peneliti Hibah DIKTI',
  ];

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block text-teal-700 mb-2 flex items-center">
            <span className="mr-2">💡</span> Pencarian Mahasiswa Berdasarkan
          </label>
          <select
            name="keahlian"
            value={formData.keahlian}
            onChange={handleChange}
            className="w-full p-2 bg-teal-200 rounded-lg focus:outline-none"
          >
            {keahlianOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-teal-700 mb-2 flex items-center">
            <span className="mr-2">🏆</span> Prestasi Akademik & Non Akademik
          </label>
          <select
            name="prestasi"
            value={formData.prestasi}
            onChange={handleChange}
            className="w-full p-2 bg-teal-200 rounded-lg focus:outline-none"
          >
            {prestasiOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-teal-700 mb-2 flex items-center">
            <span className="mr-2">📋</span> Partisipasi dalam Proyek & Kegiatan
          </label>
          <select
            name="proyekKegiatan"
            value={formData.proyekKegiatan}
            onChange={handleChange}
            className="w-full p-2 bg-teal-200 rounded-lg focus:outline-none"
          >
            {proyekKegiatanOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
        >
          Cari Mahasiswa
        </button>
      </form>
    </div>
  );
};

export default PemetaanTalenta;