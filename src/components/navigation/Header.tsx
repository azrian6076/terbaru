import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, Search, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your assignment has been graded', read: false },
    { id: 2, text: 'New course materials available', read: true },
    { id: 3, text: 'Upcoming deadline reminder', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
      {/* Mobile Menu Button */}
      <button className="md:hidden text-gray-500 hover:text-gray-700">
        <Menu size={24} />
      </button>
      
      {/* Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none"
            placeholder="Search..."
          />
        </div>
      </div>
      
      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-500 hover:text-teal-600 hover:bg-gray-100 rounded-full relative"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs">
                {unreadCount}
              </span>
            )}
          </button>
          
          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No notifications</div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <p className="text-sm text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">Just now</p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 text-center border-t border-gray-200">
                <button className="text-sm text-teal-600 hover:text-teal-800">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* User Profile */}
        <div className="flex items-center">
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;