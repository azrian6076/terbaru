import React, { useState } from 'react';

// Define the interface for a recommendation
interface Recommendation {
  name: string;
  angkatan: string;
  status: string;
}

const RekomendasiAktif: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample recommendation data (you can replace this with API data)
  const recommendations: Recommendation[] = [
    { name: 'Veri r', angkatan: 'veri.r@webmail.uad.ac.id', status: 'Belum terverifikasi' },
    { name: 'Fauzan bre', angkatan: 'fauzan.bre@webmail.uad.ac.id', status: 'Terverifikasi' },
    { name: 'Alex arif', angkatan: 'alex.arif@webmail.uad.ac.id', status: 'Belum terverifikasi' },
    { name: 'Azrian r', angkatan: 'azrian@webmail.uad.ac.id', status: 'Belum terverifikasi' },
    { name: 'Oba ilo', angkatan: 'oba.ilo@webmail.uad.ac.id', status: 'Belum terverifikasi' },
  ];

  // Filter recommendations based on search query
  const filteredRecommendations = recommendations.filter((recommendation) =>
    recommendation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Nama Mahasiswa"
          className="w-full p-2 bg-teal-100 rounded-lg focus:outline-none text-gray-700"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-teal-100 text-teal-700">
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-left">Angkatan</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecommendations.map((recommendation, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 flex items-center space-x-2">
                  <span className="text-gray-500">👤</span>
                  <span>{recommendation.name}</span>
                </td>
                <td className="p-2">{recommendation.angkatan}</td>
                <td className="p-2">{recommendation.status}</td>
                <td className="p-2">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RekomendasiAktif;