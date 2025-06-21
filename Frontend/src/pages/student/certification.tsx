import React, { useState } from 'react';
import { FaCalendarAlt, FaUpload } from 'react-icons/fa';

const CertificationForm = () => {
  const [formData, setFormData] = useState({
    judulPrestasi: '',
    sumberSertifikasi: '',
    tanggal: '',
    file: null,
  });

  // --- Handlers (tidak ada perubahan) ---
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCancel = () => {
    console.log('Action cancelled');
    setFormData({
      judulPrestasi: '',
      sumberSertifikasi: '',
      tanggal: '',
      file: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.judulPrestasi || !formData.sumberSertifikasi || !formData.tanggal || !formData.file) {
      alert('Semua field wajib diisi!');
      return;
    }

    const data = new FormData();
    data.append('certificate_name', formData.judulPrestasi);
    data.append('issuer', formData.sumberSertifikasi);
    data.append('date', formData.tanggal);
    data.append('file', formData.file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Anda harus login untuk melakukan aksi ini.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/portfolio/certifications', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error ${response.status}`);
        } else {
          throw new Error(`Server error: URL tidak ditemukan atau respons bukan JSON. Status: ${response.status}`);
        }
      }

      const result = await response.json();
      console.log('Sukses:', result);
      alert('Sertifikasi berhasil disimpan!');
      handleCancel();

    } catch (error) {
      console.error('Error submitting certification:', error);
      alert(`Terjadi kesalahan: ${error.message}`);
    }
  };

  return (
    // --- KEMBALIKAN CLASS UNTUK LAYOUT UTAMA ---
    <div className="bg-[#f0f2f5] min-h-screen p-4 md:p-8 flex justify-center">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Tambah Prestasi Baru</h1>

        <div className="flex mb-8">
          <button className="bg-teal-500 text-white py-2 px-6 rounded-full font-semibold shadow-md">
            Tambah Prestasi Baru
          </button>
          <button className="bg-gray-200 text-gray-600 py-2 px-6 rounded-full font-semibold ml-4">
            Daftar Prestasi
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12">
            
            {/* Kolom Kiri */}
            <div className="space-y-6">
              <div>
                <label htmlFor="judulPrestasi" className="block text-sm font-bold text-gray-700 mb-2">
                  Judul Sertifikasi
                </label>
                <input
                  type="text"
                  id="judulPrestasi"
                  name="judulPrestasi"
                  value={formData.judulPrestasi || ''} // Fallback ke string kosong
                  onChange={handleChange}
                  placeholder="Judul Prestasi"
                  className="w-full bg-teal-100 text-gray-600 placeholder-gray-500 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label htmlFor="sumberSertifikasi" className="block text-sm font-bold text-gray-700 mb-2">
                  Sumber Sertifikasi
                </label>
                <input
                  type="text"
                  id="sumberSertifikasi"
                  name="sumberSertifikasi"
                  value={formData.sumberSertifikasi || ''} // Fallback ke string kosong
                  onChange={handleChange}
                  placeholder="Sumber Sertifikasi"
                  className="w-full bg-teal-100 text-gray-600 placeholder-gray-500 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label htmlFor="tanggal" className="block text-sm font-bold text-gray-700 mb-2">
                  Tanggal
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="tanggal"
                    name="tanggal"
                    value={formData.tanggal || ''} // Fallback ke string kosong
                    onChange={handleChange}
                    className="w-full bg-teal-100 text-gray-600 placeholder-gray-500 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none"
                  />
                  <FaCalendarAlt className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Unggah Sertifikat / Piagam
              </label>
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center w-full h-56 bg-teal-100 border-2 border-dashed border-teal-400 rounded-xl cursor-pointer hover:bg-teal-200 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="p-3 bg-white rounded-md shadow-sm">
                    <FaUpload className="w-8 h-8 text-teal-500" />
                  </div>
                  <p className="mt-4 text-xl font-semibold text-gray-500">
                    {/* Kode aman untuk menampilkan nama file */}
                    {formData.file ? formData.file.name : 'Choose File'}
                  </p>
                </div>
                <input
                  id="fileUpload"
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col md:flex-row justify-end mt-10 space-y-3 md:space-y-0 md:space-x-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-teal-500 text-white py-2 px-10 rounded-full font-semibold shadow-md hover:bg-teal-600 transition-colors order-2 md:order-2"
            >
              Simpan Presetsasi
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full md:w-auto bg-gray-200 text-gray-700 py-2 px-10 rounded-full font-semibold hover:bg-gray-300 transition-colors order-1 md:order-1"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificationForm;