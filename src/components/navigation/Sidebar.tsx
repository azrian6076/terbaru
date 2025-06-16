import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  GraduationCap, User, BookOpen, Briefcase, BarChart2, Settings, BookMarked,
  ClipboardCheck, HelpCircle, LogOut, LayoutGrid, Folder, Trophy, CheckCircle,
  MessageCircle, Phone, Users, Building2, FileText
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
      ${active ? 'bg-teal-100 text-teal-800' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      <div className="text-teal-600">{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

interface SidebarProps {
  role: 'student' | 'lecturer' | 'prodi' | 'industry' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const getNavItems = () => {
    switch (role) {
      case 'student':
        return [
          { to: '/student', icon: <BarChart2 size={20} />, label: 'Dashboard' },
          { to: '/student/activity', icon: <FileText size={20} />, label: 'Activity' },
          { to: '/student/project', icon: <BookOpen size={20} />, label: 'Project' },
          { to: '/student/certification', icon: <ClipboardCheck size={20} />, label: 'Sertifikasi' },
          { to: '/student/profile', icon: <User size={20} />, label: 'Profile' },
        ];
      case 'lecturer':
        return [
          { to: '/lecturer', icon: <LayoutGrid size={20} />, label: 'Dashboard' },
          { to: '/lecturer/mahasiswa-bimbingan', icon: <BarChart2 size={20} />, label: 'Mahasiswa Bimbingan' },
          { to: '/lecturer/rekomendasi-aktif', icon: <Folder size={20} />, label: 'Rekomendasi Aktif' },
          { to: '/lecturer/ajakan-kolaborasi', icon: <Trophy size={20} />, label: 'Ajakan Kolaborasi' },
          { to: '/lecturer/update-bimbingan', icon: <CheckCircle size={20} />, label: 'Update Bimbingan' },
          { to: '/lecturer/chats', icon: <MessageCircle size={20} />, label: 'Chats' },
          { to: '/lecturer/calls', icon: <Phone size={20} />, label: 'Calls' },
        ];
      case 'prodi':
        return [
          { to: '/prodi', icon: <BarChart2 size={20} />, label: 'Dashboard' },
          { to: '/prodi/pemetaan-talenta', icon: <BookMarked size={20} />, label: 'Pemetaan Talenta' },
          { to: '/prodi/pemantauan-mahasiswa', icon: <Users size={20} />, label: 'Pemantauan Mahasiswa' },
          { to: '/prodi/laporan-akademik', icon: <Users size={20} />, label: 'Laporan Akademik' },
          { to: '/prodi/koordinasi-kegiatan', icon: <FileText size={20} />, label: 'Koordinasi Kegiatan' },
          { to: '/prodi/profile', icon: <User size={20} />, label: 'Profile' },
        ];
      case 'industry':
        return [
          { to: '/industry', icon: <BarChart2 size={20} />, label: 'Dashboard' },
          { to: '/industry/internships', icon: <Briefcase size={20} />, label: 'Internships' },
          { to: '/industry/projects', icon: <FileText size={20} />, label: 'Projects' },
          { to: '/industry/students', icon: <Users size={20} />, label: 'Student Profiles' },
          { to: '/industry/opportunities', icon: <Trophy size={20} />, label: 'Opportunities' },
          { to: '/industry/profile', icon: <User size={20} />, label: 'Profile' },
        ];
      case 'admin':
        return [
          { to: '/admin', icon: <BarChart2 size={20} />, label: 'Dashboard' },
          { to: '/admin/users', icon: <Users size={20} />, label: 'Users' },
          { to: '/admin/departments', icon: <Building2 size={20} />, label: 'Departments' },
          { to: '/admin/system', icon: <Settings size={20} />, label: 'System' },
          { to: '/admin/profile', icon: <User size={20} />, label: 'Profile' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <GraduationCap size={24} className="text-teal-600" />
          <h1 className="text-xl font-bold text-gray-800">E-Portfolio</h1>
        </div>
        <div className="text-sm text-gray-500 mt-1">{role.charAt(0).toUpperCase() + role.slice(1)} Portal</div>
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src={
              currentUser?.avatar ||
              'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-800">{currentUser?.name || 'Nama tidak tersedia'}</div>
            <div className="text-xs text-gray-500">{currentUser?.email || 'Email tidak tersedia'}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {getNavItems().map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to}
            />
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="space-y-1">
          <NavItem to="/help" icon={<HelpCircle size={20} />} label="Help & Support" />
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-100"
          >
            <div className="text-teal-600"><LogOut size={20} /></div>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
