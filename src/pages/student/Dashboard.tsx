import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  const [stats, setStats] = useState({
    sertifikat: 0,
    proyek: 0,
    organisasi: 0,
  });

  const [portfolio, setPortfolio] = useState({
    certifications: [],
    activities: [],
    projects: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        const [statsRes, portfolioRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/student/stats/${currentUser.id}`),
          axios.get(`http://localhost:5000/api/portfolio`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);

        setStats(statsRes.data);
        setPortfolio(portfolioRes.data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };

    fetchData();
  }, [currentUser]);

  return (
    <div className="h-full px-6 py-4">
      <h1 className="text-3xl font-bold underline text-black mb-4">
        Selamat Datang di Sistem E-Portofolio
      </h1>

      <p className="text-black-700 mb-2">
        Sistem E-Portofolio Mahasiswa ini adalah platform digital untuk dokumentasi seluruh pencapaian akademik maupun non-akademik.
      </p>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-6 rounded-xl text-center">
          <div className="text-3xl font-bold">{stats.sertifikat}</div>
          <div className="text-sm mt-1">Sertifikat</div>
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-6 rounded-xl text-center">
          <div className="text-3xl font-bold">{stats.proyek}</div>
          <div className="text-sm mt-1">Project</div>
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-6 rounded-xl text-center">
          <div className="text-2xl font-bold">Aktif</div>
          <div className="text-sm mt-1">Status Mahasiswa</div>
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-6 rounded-xl text-center">
          <div className="text-3xl font-bold">{stats.organisasi}</div>
          <div className="text-sm mt-1">Organisasi</div>
        </div>
      </div>

      {/* Daftar Portofolio */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-black mb-2">Daftar Sertifikat</h2>
        <ul className="mb-4 list-disc pl-6 text-black">
          {portfolio.certifications.map((item: any, i: number) => (
            <li key={i}>
              {item.certificate_name} – {new Date(item.date).toLocaleDateString()}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-black mb-2">Daftar Kegiatan</h2>
        <ul className="mb-4 list-disc pl-6 text-black">
          {portfolio.activities.map((item: any, i: number) => (
            <li key={i}>
              {item.nama_kegiatan} ({item.jenis_kegiatan}) – {new Date(item.tanggal).toLocaleDateString()}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-black mb-2">Daftar Proyek</h2>
        <ul className="list-disc pl-6 text-black">
          {portfolio.projects.length > 0 ? (
            portfolio.projects.map((item: any, i: number) => (
              <li key={i}>{item.nama_project}</li>
            ))
          ) : (
            <li>Tidak ada data proyek.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
