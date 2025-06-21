import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserCircle2Icon } from 'lucide-react'; // pastikan lucide-react terpasang

const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return <p className="text-center text-gray-600 mt-10">Memuat data...</p>;

  const { username, email, role, profile } = currentUser;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <UserCircle2Icon className="w-10 h-10 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Profil Pengguna</h1>
          <p className="text-sm text-gray-500">Informasi akun dan detail pengguna</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="font-semibold">Nama Pengguna:</p>
          <p className="text-gray-800">{username}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p className="text-gray-800">{email}</p>
        </div>
        <div>
          <p className="font-semibold">Role:</p>
          <p className="capitalize text-gray-800">{role}</p>
        </div>

        {role === 'student' && profile && (
          <>
            <div>
              <p className="font-semibold">NIM:</p>
              <p className="text-gray-800">{profile.nim}</p>
            </div>
            <div>
              <p className="font-semibold">Nama Mahasiswa:</p>
              <p className="text-gray-800">{profile.nama}</p>
            </div>
            <div>
              <p className="font-semibold">Keahlian:</p>
              <p className="text-gray-800">{profile.keahlian}</p>
            </div>
            <div>
              <p className="font-semibold">Email Mahasiswa:</p>
              <p className="text-gray-800">{profile.email}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
