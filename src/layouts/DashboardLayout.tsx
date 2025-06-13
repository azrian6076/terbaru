import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';

interface DashboardLayoutProps {
  role: 'student' | 'lecturer' | 'prodi' | 'industry' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role !== role) {
      navigate(`/${user?.role}`);
    }
  }, [isAuthenticated, user, navigate, role]);

  // Selalu render layout jika sudah otentikasi
  return isAuthenticated ? (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  ) : null;
};

export default DashboardLayout;