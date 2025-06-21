import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from '../../components/dashboard/StatCard';
import DashboardSection from '../../components/dashboard/DashboardSection';
import { Briefcase, Users, FileText, Award, GraduationCap, Building2 } from 'lucide-react';

const IndustryDashboard: React.FC = () => {
  const { user } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="h-full">
      {/* Welcome Banner */}
      <motion.div
        className="bg-gradient-to-r from-amber-500 to-yellow-400 rounded-xl p-6 text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">Selamat Datang di Sistem E-Portfolio</h1>
        <p className="opacity-90">
          Halo, {user?.name || 'Mitra Industri'}! Temukan dan kelola hubungan dengan calon talent terbaik dari kampus kami.
        </p>
      </motion.div>
      
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            title="Active Internships"
            value="8"
            icon={<Briefcase className="text-amber-500" />}
            change="+2"
            trend="up"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Student Applications"
            value="34"
            icon={<FileText className="text-blue-500" />}
            change="+15"
            trend="up"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Interns Hired"
            value="12"
            icon={<Users className="text-green-500" />}
            change="+5"
            trend="up"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Open Projects"
            value="5"
            icon={<Briefcase className="text-purple-500" />}
            change="+1"
            trend="up"
          />
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Applicants */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DashboardSection title="Recent Applicants" icon={<Users size={18} />}>
            <div className="space-y-3">
              {[
                { name: 'Ahmad Rahman', major: 'Computer Science', position: 'Web Developer Intern', skills: ['JavaScript', 'React', 'Node.js'], status: 'New' },
                { name: 'Siti Nurhayati', major: 'Information Systems', position: 'UI/UX Designer', skills: ['Figma', 'Adobe XD', 'UX Research'], status: 'Reviewing' },
                { name: 'Budi Santoso', major: 'Computer Engineering', position: 'Backend Developer', skills: ['Java', 'Spring Boot', 'MySQL'], status: 'Interviewing' },
                { name: 'Dewi Putri', major: 'Data Science', position: 'Data Analyst Intern', skills: ['Python', 'SQL', 'Tableau'], status: 'New' },
              ].map((applicant, index) => (
                <div key={index} className="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-800 font-medium">{applicant.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">{applicant.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        applicant.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        applicant.status === 'Reviewing' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {applicant.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{applicant.position} · {applicant.major}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {applicant.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <button className="text-sm text-amber-600 hover:text-amber-800 mt-2">
                View all applicants
              </button>
            </div>
          </DashboardSection>
        </motion.div>
        
        {/* Internship Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DashboardSection title="Active Programs" icon={<Briefcase size={18} />}>
            <div className="space-y-3">
              {[
                { title: 'Web Development Internship', openings: 3, applications: 15, deadline: '15 Nov 2025' },
                { title: 'UX Research Assistant', openings: 2, applications: 8, deadline: '20 Nov 2025' },
                { title: 'Data Science Internship', openings: 4, applications: 11, deadline: '30 Nov 2025' },
              ].map((program, index) => (
                <div key={index} className="p-3 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
                  <h4 className="font-medium text-gray-800">{program.title}</h4>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                    <div className="text-gray-600">
                      <span className="block font-medium">Openings</span>
                      <span>{program.openings}</span>
                    </div>
                    <div className="text-gray-600">
                      <span className="block font-medium">Applications</span>
                      <span>{program.applications}</span>
                    </div>
                    <div className="text-gray-600">
                      <span className="block font-medium">Deadline</span>
                      <span>{program.deadline}</span>
                    </div>
                  </div>
                </div>
              ))}
              <button className="text-sm text-amber-600 hover:text-amber-800 mt-2">
                Manage all programs
              </button>
            </div>
          </DashboardSection>
        </motion.div>
      </div>
      
      {/* Talent Pool Overview */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <DashboardSection title="Talent Pool Overview" icon={<GraduationCap size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { skill: 'Web Development', students: 45, trend: '+12%', color: 'border-blue-500' },
              { skill: 'Mobile Development', students: 38, trend: '+8%', color: 'border-green-500' },
              { skill: 'Data Science', students: 29, trend: '+20%', color: 'border-purple-500' },
              { skill: 'UI/UX Design', students: 32, trend: '+15%', color: 'border-pink-500' },
              { skill: 'Cybersecurity', students: 18, trend: '+5%', color: 'border-red-500' },
              { skill: 'Cloud Computing', students: 25, trend: '+18%', color: 'border-amber-500' },
              { skill: 'Machine Learning', students: 20, trend: '+25%', color: 'border-indigo-500' },
              { skill: 'Blockchain', students: 12, trend: '+10%', color: 'border-emerald-500' },
            ].map((skill, index) => (
              <div key={index} className={`bg-white p-4 rounded-lg border-l-4 ${skill.color} shadow-sm hover:shadow-md transition-shadow`}>
                <h4 className="font-medium text-gray-800">{skill.skill}</h4>
                <div className="mt-2 flex justify-between items-end">
                  <div className="text-2xl font-bold text-gray-800">{skill.students}</div>
                  <div className="text-sm text-green-600">{skill.trend}</div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Available students</p>
              </div>
            ))}
          </div>
        </DashboardSection>
      </motion.div>
    </div>
  );
};

export default IndustryDashboard;