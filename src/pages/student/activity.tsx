import React, { useState } from 'react';

const ActivityForm: React.FC = () => {
  const [formData, setFormData] = useState({
    namaKegiatan: '',
    jenisKegiatan: '',
    deskripsi: '',
    tempat: '',
    tanggal: '',
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await fetch('http://localhost:5000/api/activities', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      console.log('Success:', result);

      setFormData({
        namaKegiatan: '',
        jenisKegiatan: '',
        deskripsi: '',
        tempat: '',
        tanggal: '',
        file: null,
      });
    } catch (err) {
      console.error('Error submitting activity:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="namaKegiatan" placeholder="Nama Kegiatan" value={formData.namaKegiatan} onChange={handleChange} />
      <input type="text" name="jenisKegiatan" placeholder="Jenis Kegiatan" value={formData.jenisKegiatan} onChange={handleChange} />
      <textarea name="deskripsi" placeholder="Deskripsi" value={formData.deskripsi} onChange={handleChange} />
      <input type="text" name="tempat" placeholder="Tempat" value={formData.tempat} onChange={handleChange} />
      <input type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} />
      <input type="file" name="file" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ActivityForm;
