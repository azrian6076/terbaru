import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-300 to-blue-500 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl w-full">

        {/* Sidebar Kiri */}
        <div className="hidden md:flex flex-col bg-gradient-to-b from-teal-500 to-blue-600 text-white p-10 w-1/2 relative">

          <div className="mb-4">
            <h1 className="text-2xl font-bold italic text-center">Sistem Manajemen Portofolio</h1>
          </div>

          <div className="flex justify-center mt-[-10px] mb-4">
            <img
              src="/logo.png"
              alt="Logo Portofolio"
              className="w-56"
            />
          </div>

          <div className="absolute bottom-0 left-0">
            <img src="/cuate.png" alt="Ilustrasi" className="w-60" />
          </div>
        </div>

        {/* Bagian Form Kanan */}
        <div className="w-full md:w-1/2 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
