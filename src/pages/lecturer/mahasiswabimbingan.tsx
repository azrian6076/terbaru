import React, { useState, FormEvent } from 'react';

// Definisikan tipe untuk mahasiswa bimbingan
interface Student {
  name: string;
  email: string;
}

const MahasiswaBimbingan: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([
    { name: 'Veri', email: 'ver.tor@webmail.uad.ac.id' },
    { name: 'Fauzan bre', email: 'fauzan.bre@webmail.uad.ac.id' },
    { name: 'Alex arif', email: 'alex.arif@webmail.uad.ac.id' },
    { name: 'Azrian r', email: 'azrian@webmail.uad.ac.id' },
    { name: 'Oba ilo', email: 'oba.ilo@webmail.uad.ac.id' },
  ]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log('Email input:', e.target.value); // Debugging
  };

  const handleAddStudent = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with email:', email); // Debugging
    if (email && email.includes('@')) {
      const newStudent: Student = {
        name: email.split('@')[0], // Ambil bagian sebelum '@' sebagai nama
        email: email,
      };
      setStudents((prevStudents) => [...prevStudents, newStudent]);
      console.log('New student added:', newStudent); // Debugging
      setEmail(''); // Reset input setelah menambahkan
    } else {
      console.log('Invalid email format'); // Debugging
      alert('Masukkan alamat email yang valid');
    }
  };

  const handleRemoveStudent = (emailToRemove: string) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.email !== emailToRemove)
    );
    console.log('Student removed:', emailToRemove); // Debugging
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Tambah dan Kelola Mahasiswa Bimbingan
      </h1>

      {/* Form Tambah Mahasiswa */}
      <form onSubmit={handleAddStudent} className="flex items-center mb-6">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Masukkan email mahasiswa"
          className="w-full p-3 border border-gray-300 rounded-l-lg bg-gray-100 text-gray-600 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-r-lg"
        >
          Tambah
        </button>
      </form>

      {/* Daftar Mahasiswa Bimbingan */}
      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.email}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-gray-500 text-lg">👤</span>
              </div>
              <div>
                <p className="text-gray-800 font-medium">{student.name}</p>
                <p className="text-gray-500 text-sm">{student.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveStudent(student.email)}
              className="text-gray-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MahasiswaBimbingan;