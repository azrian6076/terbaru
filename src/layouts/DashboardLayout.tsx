import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';

interface DashboardLayoutProps {
  role: 'student' | 'lecturer' | 'prodi' | 'industry' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const { currentUser, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (currentUser?.role !== role) {
      navigate(`/${currentUser?.role}`);
    }
  }, [token, currentUser, navigate, role]);

  return token ? (
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
