import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react'; // Pastikan lucide-react diinstal

const Project = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Aplikasi Mobile Pengelola Tugas', technology: 'React Native', result: 'Aplikasi selesai' },
    { id: 2, title: 'Website E-Commerce', technology: 'Node.js, React', result: 'Dalam pengembangan' },
    { id: 3, title: 'Sistem Absensi Berbasis IoT', technology: 'Arduino, Python', result: 'Belum selesai' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', technology: '', result: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.technology && newProject.result) {
      setProjects((prev) => [
        ...prev,
        { id: Date.now(), title: newProject.title, technology: newProject.technology, result: newProject.result },
      ]);
      setNewProject({ title: '', technology: '', result: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <GraduationCap size={24} className="mr-2 text-teal-600" />
        Tambah Proyek
      </h1>

      {/* Toggle Add Form */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
        >
          Tambah Proyek Baru
        </button>
      )}

      {/* Add Project Form */}
      {showAddForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tambahkan Informasi Proyek Anda</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Judul</label>
              <input
                type="text"
                name="title"
                value={newProject.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Judul Proyek"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Teknologi</label>
              <input
                type="text"
                name="technology"
                value={newProject.technology}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Teknologi Yang Digunakan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Hasil</label>
              <input
                type="text"
                name="result"
                value={newProject.result}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Deskripsi Hasil Proyek"
              />
            </div>
            <button
              onClick={handleAddProject}
              className="bg-teal-200 text-teal-800 px-4 py-2 rounded-lg hover:bg-teal-300"
            >
              Tambahkan
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="ml-2 text-gray-600 hover:text-gray-800"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Project List */}
      <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Judul Proyek</th>
              <th className="px-4 py-2 text-left">Teknologi</th>
              <th className="px-4 py-2 text-left">Hasil</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <tr key={project.id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{project.title}</td>
                  <td className="px-4 py-2">{project.technology}</td>
                  <td className="px-4 py-2">{project.result}</td>
                  <td className="px-4 py-2">
                    <button className="text-teal-500 hover:underline">Detail</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                  Belum ada proyek.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Project;