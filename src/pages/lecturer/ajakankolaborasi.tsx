import React, { useState } from 'react';

interface FormData {
  mahasiswa: string;
  topik: string;
  deskripsi: string;
}

const AjakanKolaborasi: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    mahasiswa: 'azrian ramadhan',
    topik: 'Pengembangan aplikasi',
    deskripsi: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add submission logic here
  };

  // Sample mahasiswa options
  const mahasiswaOptions = ['azrian ramadhan', 'Veri r', 'Fauzan bre', 'Alex arif', 'Oba ilo'];

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-teal-700 mb-2">Mahasiswa</label>
          <select
            name="mahasiswa"
            value={formData.mahasiswa}
            onChange={handleChange}
            className="w-full p-2 bg-teal-200 rounded-lg focus:outline-none"
          >
            {mahasiswaOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-teal-700 mb-2">Topik</label>
          <input
            type="text"
            name="topik"
            value={formData.topik}
            onChange={handleChange}
            className="w-full p-2 bg-teal-200 rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-teal-700 mb-2">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            placeholder="Masukkan deskripsi..."
            className="w-full p-2 bg-teal-200 rounded-lg focus:outline-none h-24"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
        >
          Kirim
        </button>
      </form>
    </div>
  );
};

export default AjakanKolaborasi;