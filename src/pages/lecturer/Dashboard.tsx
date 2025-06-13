// LecturerDashboard.tsx

import React from "react";

const LecturerDashboard: React.FC = () => {
  const stats = [
    { title: "Mahasiswa Aktif", value: 0 },
    { title: "Mahasiswa Bimbingan", value: 0 },
    { title: "Rekomendasi Aktif", value: 0 },
    { title: "Mahasiswa Binaan", value: 0 },
  ];

  const students = [
    {
      name: "Veri ah",
      nim: "2200016666",
      email: "veri78@gmail.com",
      prodi: "Sistem informasi",
      status: "Active",
    },
    {
      name: "Oba asik",
      nim: "2200016000",
      email: "veri78@gmail.com",
      prodi: "Sistem informasi",
      status: "Inactive",
    },
    {
      name: "Alex dio djambu",
      nim: "2200016000",
      email: "veri78@gmail.com",
      prodi: "Sistem informasi",
      status: "Active",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dasboard Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-teal-700 text-white rounded-xl p-6 shadow-md text-center"
          >
            <p className="text-lg font-medium">{stat.title}</p>
            <h2 className="text-4xl font-bold mt-2">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Main Content: Table and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Department List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left">
                    <th className="py-2 px-4">Nama Mahasiswa</th>
                    <th className="py-2 px-4">NIM</th>
                    <th className="py-2 px-4">Gmail</th>
                    <th className="py-2 px-4">Prodi</th>
                    <th className="py-2 px-4">Action</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-2 px-4">{student.name}</td>
                      <td className="py-2 px-4">{student.nim}</td>
                      <td className="py-2 px-4">{student.email}</td>
                      <td className="py-2 px-4">{student.prodi}</td>
                      <td className="py-2 px-4 space-x-2">
                        <button className="text-purple-600 hover:text-purple-800">
                          👤
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          🗑️
                        </button>
                      </td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <button className="text-sm text-teal-800 bg-teal-100 px-4 py-2 rounded hover:bg-teal-200 transition">
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Calendar</h2>
          <div className="text-center text-sm text-gray-600 mb-2">September</div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-700">
            {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
              <div key={d} className="font-medium">
                {d}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className={`p-2 rounded-full ${
                  i + 1 === 2 ? "bg-red-500 text-white font-semibold" : ""
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
