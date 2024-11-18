import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  navigation: Array<{
    name: string;
    path: string;
    icon: React.ReactNode;
  }>;
  currentPath: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  navigation,
  currentPath,
}) => {
  const navigate = useNavigate();
  const logout = useStore(state => state.logout);
  const currentUser = useStore(state => state.currentUser);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 h-screen fixed">
          <div className="flex flex-col h-full">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Hostel Management
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {currentUser?.fullName || currentUser?.username}
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-lg ${
                        currentPath === item.path
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Logout button */}
            <div className="p-4">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <LogOut size={18} />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64">
          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;