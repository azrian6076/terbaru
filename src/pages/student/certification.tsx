import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { useStudentData } from '../../contexts/StudentDataContext';


const Certification = () => {
  console.log('Certification component rendered');

  const [formData, setFormData] = useState<{
    certificateName: string;
    issuer: string;
    date: string;
    file: File | null;
  }>({
    certificateName: '',
    issuer: '',
    date: '',
    file: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Certification:', formData);
    setFormData({ certificateName: '', issuer: '', date: '', file: null });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Award size={24} className="mr-2 text-teal-600" />
        Unggah Sertifikasi
      </h1>
      <p className="text-gray-600 mb-6">Unggah & isi detail sertifikat anda.</p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Nama Sertifikat</label>
              <input
                type="text"
                name="certificateName"
                value={formData.certificateName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Nama Sertifikat"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Penerbit</label>
              <input
                type="text"
                name="issuer"
                value={formData.issuer}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Penerbit"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Tanggal</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Pilih Tanggal"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Unggah File</label>
            <div className="border border-dashed border-teal-200 rounded-lg p-6 text-center bg-teal-50">
              <label className="cursor-pointer">
                <svg
                  className="mx-auto h-12 w-12 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V7m0 0L3 11m4-4l4 4m6 4v5m-5-5h5m-5 0H9m8-9v3m-3-3h3m-3 0H9"
                  />
                </svg>
                <span className="mt-2 block text-sm font-medium text-gray-600">Choose File</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
              {formData.file && (
                <p className="mt-2 text-sm text-gray-500">{formData.file.name}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Certification;