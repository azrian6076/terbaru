import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    judulProyek: '',
    deskripsiProyek: '',
    tautanGithub: '',
    teknologi: { html: false, css: false, python: false, lainnya: false },
    hasil: null,
  });

  // --- Handlers (tidak ada perubahan) ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, teknologi: { ...prev.teknologi, [name]: checked } }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, hasil: e.target.files ? e.target.files[0] : null }));
  };

  const handleCancel = () => {
    console.log('Action cancelled');
    setFormData({
      judulProyek: '',
      deskripsiProyek: '',
      tautanGithub: '',
      teknologi: { html: false, css: false, python: false, lainnya: false },
      hasil: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.judulProyek || !formData.deskripsiProyek || !formData.hasil) {
      alert('Judul, Deskripsi, dan File Hasil wajib diisi!');
      return;
    }

    const dataToSubmit = new FormData();
    dataToSubmit.append('nama_project', formData.judulProyek);
    dataToSubmit.append('deskripsi', formData.deskripsiProyek);
    dataToSubmit.append('link_project', formData.tautanGithub);
    if (formData.hasil) {
      dataToSubmit.append('hasil', formData.hasil);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Anda harus login untuk melakukan aksi ini.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/portfolio/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: dataToSubmit,
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
      alert('Proyek berhasil disimpan!');
      handleCancel();

    } catch (error) {
      console.error('Error submitting project:', error);
      alert(`Terjadi kesalahan: ${error.message}`);
    }
  };

  const technologies = ['HTML', 'CSS', 'Python', 'Lainnya'];

  return (
    // --- KEMBALIKAN CLASS UNTUK LAYOUT UTAMA ---
    <div className="bg-[#f0f2f5] min-h-screen p-4 md:p-8 flex justify-center">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8">Tambahkan Proyek</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12">
            
            {/* Kolom Kiri */}
            <div className="space-y-6">
              <div>
                <label htmlFor="judulProyek" className="block text-sm font-bold text-gray-700 mb-2">
                  Judul Proyek
                </label>
                <input
                  type="text"
                  id="judulProyek"
                  name="judulProyek"
                  value={formData.judulProyek || ''} // Gunakan fallback string kosong
                  onChange={handleChange}
                  className="w-full bg-teal-100 text-gray-600 placeholder-gray-500 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label htmlFor="deskripsiProyek" className="block text-sm font-bold text-gray-700 mb-2">
                  Deskripsi Proyek
                </label>
                <textarea
                  id="deskripsiProyek"
                  name="deskripsiProyek"
                  rows={4}
                  value={formData.deskripsiProyek || ''} // Gunakan fallback string kosong
                  onChange={handleChange}
                  placeholder="Jelaskan tentang proyek dengan singkat"
                  className="w-full bg-teal-100 text-gray-600 placeholder-gray-500 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Teknologi Yang Digunakan
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                  {/* Kode aman untuk rendering checkbox */}
                  {technologies && formData.teknologi && technologies.map((tech) => (
                    <div key={tech} className="flex items-center">
                      <input
                        type="checkbox"
                        id={tech.toLowerCase()}
                        name={tech.toLowerCase()}
                        checked={!!formData.teknologi[tech.toLowerCase()]} // Pastikan boolean
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label htmlFor={tech.toLowerCase()} className="ml-2 text-sm text-gray-700">
                        {tech}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-6">
               <div>
                <label htmlFor="tautanGithub" className="block text-sm font-bold text-gray-700 mb-2">
                  Tautan / Github
                </label>
                <input
                  type="text"
                  id="tautanGithub"
                  name="tautanGithub"
                  value={formData.tautanGithub || ''} // Gunakan fallback string kosong
                  onChange={handleChange}
                  className="w-full bg-teal-100 text-gray-600 placeholder-gray-500 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Hasil
                </label>
                <label
                  htmlFor="fileUpload"
                  className="flex flex-col items-center justify-center w-full h-32 bg-teal-100 border-2 border-dashed border-teal-400 rounded-xl cursor-pointer hover:bg-teal-200 transition-colors"
                >
                  <div className="flex items-center justify-center space-x-4">
                    <div className="p-2 bg-white rounded-md shadow-sm">
                      <FaUpload className="w-6 h-6 text-teal-500" />
                    </div>
                    <p className="text-lg font-semibold text-gray-500">
                      {formData.hasil ? formData.hasil.name : 'Choose File'}
                    </p>
                  </div>
                  <input
                    id="fileUpload"
                    type="file"
                    name="hasil"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Tombol Aksi (Responsif) */}
          <div className="flex flex-col md:flex-row justify-end mt-10 space-y-3 md:space-y-0 md:space-x-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-teal-500 text-white py-2 px-8 rounded-lg font-semibold shadow-md hover:bg-teal-600 transition-colors order-2 md:order-2"
            >
              Simpan Proyek
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full md:w-auto bg-gray-200 text-gray-700 py-2 px-8 rounded-lg font-semibold hover:bg-gray-300 transition-colors order-1 md:order-1"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;