// src/layouts/AuthLayout.tsx

import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-300 to-blue-500 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Side (Illustration & Description) */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-teal-400 to-blue-500 text-white p-10 w-1/2">
          <img src="/ilustrasi.png" alt="Ilustrasi" className="w-3/4 mb-6" />
          <h1 className="text-xl font-semibold text-center italic">Sistem manajemen Portofolio</h1>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
