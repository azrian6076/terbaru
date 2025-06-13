import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  // Mock profile data based on user role
  const profileData = React.useMemo(() => {
    if (user?.role === 'student') {
      return {
        fullName: 'John Student',
        role: 'Student',
        email: 'student@example.com',
        studentId: 'STD12345',
        department: 'Computer Science',
        year: '3rd Year',
        gpa: '3.8',
        address: 'Jakarta, Indonesia',
        phone: '+62 812-3456-7890',
        joinedDate: 'September 2023',
      };
    } else if (user?.role === 'lecturer') {
      return {
        fullName: 'Dr. Jane Lecturer',
        role: 'Lecturer',
        email: 'lecturer@example.com',
        staffId: 'LCT54321',
        department: 'Computer Science',
        specialization: 'Web Development & AI',
        courses: '5 Active Courses',
        education: 'PhD in Computer Science',
        office: 'Building A, Room 203',
        phone: '+62 812-3456-7891',
        joinedDate: 'January 2020',
      };
    } else if (user?.role === 'prodi') {
      return {
        fullName: 'Prodi Admin',
        role: 'Program Administrator',
        email: 'prodi@example.com',
        staffId: 'PRODI98765',
        department: 'Computer Science',
        position: 'Program Coordinator',
        students: '250+ Students',
        faculty: '25 Faculty Members',
        office: 'Administration Building, Room 105',
        phone: '+62 812-3456-7892',
        joinedDate: 'March 2019',
      };
    } else if (user?.role === 'industry') {
      return {
        fullName: 'Industry Partner',
        role: 'Industry Representative',
        email: 'industry@example.com',
        partnerId: 'IND76543',
        company: 'Tech Innovations Ltd.',
        position: 'Talent Acquisition Manager',
        industry: 'Information Technology',
        partnerships: '3 Active University Partnerships',
        office: 'Jakarta Business District',
        phone: '+62 812-3456-7893',
        joinedDate: 'June 2022',
      };
    } else {
      return {
        fullName: 'System Admin',
        role: 'Administrator',
        email: 'admin@example.com',
        staffId: 'ADMIN12345',
        department: 'IT Services',
        position: 'System Administrator',
        responsibilities: 'Platform Management & User Support',
        access: 'Full System Access',
        office: 'IT Department, Main Campus',
        phone: '+62 812-3456-7894',
        joinedDate: 'January 2018',
      };
    }
  }, [user?.role]);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="bg-white rounded-xl shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header/Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-teal-500"></div>
        
        {/* Profile Info */}
        <div className="relative px-6 py-8">
          {/* Profile Image */}
          <div className="absolute -top-16 left-6">
            <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
              <img 
                src={user?.avatar || "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          {/* Profile Header */}
          <div className="ml-36 pb-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">{profileData.fullName}</h1>
            <p className="text-gray-600">{profileData.role}</p>
          </div>
          
          {/* Profile Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h2>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800">{profileData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {user?.role === 'student' ? (
                    <GraduationCap size={18} className="text-gray-400 mr-3" />
                  ) : (
                    <Briefcase size={18} className="text-gray-400 mr-3" />
                  )}
                  <div>
                    <p className="text-sm text-gray-500">
                      {user?.role === 'student' ? 'Student ID' : 'Staff ID'}
                    </p>
                    <p className="text-gray-800">
                      {user?.role === 'student' ? profileData.studentId : 
                       user?.role === 'lecturer' ? profileData.staffId :
                       user?.role === 'prodi' ? profileData.staffId :
                       user?.role === 'industry' ? profileData.partnerId :
                       profileData.staffId}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <User size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="text-gray-800">{profileData.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Office/Location</p>
                    <p className="text-gray-800">
                      {user?.role === 'student' ? profileData.address :
                       user?.role === 'lecturer' ? profileData.office :
                       user?.role === 'prodi' ? profileData.office :
                       user?.role === 'industry' ? profileData.office :
                       profileData.office}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Professional Information</h2>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Briefcase size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {user?.role === 'student' ? 'Year Level' : 'Position'}
                    </p>
                    <p className="text-gray-800">
                      {user?.role === 'student' ? profileData.year :
                       user?.role === 'lecturer' ? profileData.specialization :
                       user?.role === 'prodi' ? profileData.position :
                       user?.role === 'industry' ? profileData.position :
                       profileData.position}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <GraduationCap size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {user?.role === 'student' ? 'GPA' : 
                       user?.role === 'lecturer' ? 'Education' :
                       user?.role === 'prodi' ? 'Faculty' :
                       user?.role === 'industry' ? 'Industry' :
                       'Responsibilities'}
                    </p>
                    <p className="text-gray-800">
                      {user?.role === 'student' ? profileData.gpa :
                       user?.role === 'lecturer' ? profileData.education :
                       user?.role === 'prodi' ? profileData.faculty :
                       user?.role === 'industry' ? profileData.industry :
                       profileData.responsibilities}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Joined Date</p>
                    <p className="text-gray-800">{profileData.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-8 flex space-x-3">
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              Edit Profile
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;