import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/student/Dashboard';
import LecturerDashboard from './pages/lecturer/Dashboard';
import ProdiDashboard from './pages/prodi/Dashboard';
import IndustryDashboard from './pages/industry/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Profile from './components/shared/Profile';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import Project from './pages/student/project';
import Certification from './pages/student/certification';
import { StudentDataProvider } from './contexts/StudentDataContext';
import MahasiswaBimbingan from './pages/lecturer/mahasiswabimbingan';
import RekomendasiAktif from './pages/lecturer/rekomendasiaktif';
import AjakanKolaborasi from './pages/lecturer/ajakankolaborasi';
import UpdateBimbingan from './pages/lecturer/updatebimbingan';
import PemetaanTalenta from './pages/prodi/pemetaantalenta';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

          {/* Student */}
          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <DashboardLayout role="student" />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="project" element={<Project />} />
            <Route path="certification" element={<Certification />} />
          </Route>

          {/* Lecturer */}
          <Route
            path="/lecturer"
            element={
              <ProtectedRoute role="lecturer">
                <DashboardLayout role="lecturer" />
              </ProtectedRoute>
            }
          >
            <Route index element={<LecturerDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="mahasiswa-bimbingan" element={<MahasiswaBimbingan />} />
            <Route path="rekomendasi-aktif" element={<RekomendasiAktif />} />
            <Route path="ajakan-kolaborasi" element={<AjakanKolaborasi />} />
            <Route path="update-bimbingan" element={<UpdateBimbingan />} />
          </Route>

          {/* Prodi */}
          <Route
            path="/prodi"
            element={
              <ProtectedRoute role="prodi">
                <DashboardLayout role="prodi" />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProdiDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="pemetaan-talenta" element={<PemetaanTalenta />} />
          </Route>

          {/* Industry */}
          <Route
            path="/industry"
            element={
              <ProtectedRoute role="industry">
                <DashboardLayout role="industry" />
              </ProtectedRoute>
            }
          >
            <Route index element={<IndustryDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout role="admin" />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
