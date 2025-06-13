import React, { useState } from 'react';

const Activity = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    namaKegiatan: '',
    jenisKegiatan: '',
    deskripsi: '',
    tempat: '',
    tanggal: '',
    file: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Data aktivitas:', formData);
    // Reset form
    setFormData({
      namaKegiatan: '',
      jenisKegiatan: '',
      deskripsi: '',
      tempat: '',
      tanggal: '',
      file: null,
    });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-teal-700 mb-2">📊 Activity</h1>

      <div className="mb-4">
        <strong>Keterangan:</strong>
        <p className="text-gray-700 mt-2">
          Halaman Activity merupakan salah satu fitur penting dalam Sistem Portofolio Mahasiswa...
          {/* (ringkas sesuai yang kamu punya) */}
        </p>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-teal-400 hover:bg-teal-500 text-white font-semibold px-4 py-2 rounded mb-4"
      >
        + Tambahkan Kegiatan
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-teal-100 rounded-lg p-6 shadow-md max-w-xl mx-auto"
        >
          <h2 className="text-lg font-semibold mb-4">Tambahkan Kegiatan</h2>

          <div className="space-y-3">
            <input
              type="text"
              name="namaKegiatan"
              value={formData.namaKegiatan}
              onChange={handleInputChange}
              placeholder="Nama Kegiatan"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="jenisKegiatan"
              value={formData.jenisKegiatan}
              onChange={handleInputChange}
              placeholder="Jenis Kegiatan"
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              placeholder="Deskripsi"
              className="w-full p-2 border rounded"
              rows={3}
              required
            />
            <input
              type="text"
              name="tempat"
              value={formData.tempat}
              onChange={handleInputChange}
              placeholder="Tempat / Penyelenggara"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleInputChange}
              placeholder="Tanggal Mulai & Selesai"
              className="w-full p-2 border rounded"
              required
            />
            <div className="flex items-center gap-3">
              <label className="bg-white border px-4 py-2 rounded cursor-pointer">
                Document
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
              <span className="text-sm text-gray-600">
                {formData.file ? formData.file.name : 'Tidak ada file yang dipilih'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </form>
      )}
    </div>
  );
};

export default Activity;
