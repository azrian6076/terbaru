import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, FileText, BookOpen } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ProdiDashboard: React.FC = () => {
  const activeStudents = 1386;

  const barData = {
    labels: ['2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Jumlah Mahasiswa',
        data: [400, 360, 310, 280],
        backgroundColor: '#0ea5e9',
        borderRadius: 8,
      }
    ],
  };

  const barOptions = {
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
      }
    }
  };

  const stats = [
    { icon: <Award className="text-blue-600" />, title: 'Prestasi Akademik', value: 45 },
    { icon: <FileText className="text-purple-600" />, title: 'Non Akademik / Lomba', value: 35 },
    { icon: <BookOpen className="text-green-600" />, title: 'Proyek / PKM', value: 50 },
  ];

  const students = [
    { name: 'Veni Iqbalina', nim: '2200001237', email: 'veni10@gmail.com', major: 'Sistem Informasi', status: 'Active' },
    { name: 'Ova Benriato', nim: '2200001579', email: 'ova09@gmail.com', major: 'Sistem Informasi', status: 'Active' },
    { name: 'Alex Sapta', nim: '2200001808', email: 'alex07@gmail.com', major: 'Manajemen', status: 'Active' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Jumlah Mahasiswa Aktif */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold">Jumlah Mahasiswa Aktif</h3>
          <h1 className="text-4xl font-bold text-gray-800 mt-2">{activeStudents.toLocaleString()}</h1>
          <div className="mt-4">
            <Bar data={barData} options={barOptions} height={180} />
          </div>
        </div>

        {/* Statistik */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tabel Mahasiswa */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-800 font-semibold text-lg mb-4">Mahasiswa Dengan Portofolio Lengkap</h3>
          <div className="overflow-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-2">Nama Mahasiswa</th>
                  <th scope="col" className="px-4 py-2">NIM</th>
                  <th scope="col" className="px-4 py-2">Gmail</th>
                  <th scope="col" className="px-4 py-2">Angkatan</th>
                  <th scope="col" className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.nim}</td>
                    <td className="px-4 py-2">{student.email}</td>
                    <td className="px-4 py-2">{student.major}</td>
                    <td className="px-4 py-2">
                      <span className="text-green-600 font-medium">{student.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <button className="bg-cyan-600 text-white px-4 py-2 rounded-md text-sm hover:bg-cyan-700 transition">
              Lihat Semua Portofolio Mahasiswa
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProdiDashboard;
