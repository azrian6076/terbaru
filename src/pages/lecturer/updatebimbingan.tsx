import React, { useState } from 'react';

interface FormData {
  mahasiswa: string;
  status: string;
  catatan: string;
}

const UpdateBimbingan: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    mahasiswa: 'Alex arif setiawan',
    status: 'Aktif',
    catatan: '',
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

  // Sample mahasiswa and status options
  const mahasiswaOptions = ['Alex arif setiawan', 'Veri r', 'Fauzan bre', 'Azrian r', 'Oba ilo'];
  const statusOptions = ['Aktif', 'Tidak Aktif', 'Selesai'];

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
          <label className="block text-teal-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 bg-teal-200 rounded-lg focus:outline-none"
          >
            {statusOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-teal-700 mb-2">Catatan Bimbingan</label>
          <textarea
            name="catatan"
            value={formData.catatan}
            onChange={handleChange}
            placeholder="Tambahkan catatan..."
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

export default UpdateBimbingan;