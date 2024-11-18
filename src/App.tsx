import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useStore from './store/useStore';
import Login from './pages/Login';
import StudentSignup from './pages/StudentSignup';
import AdminDashboard from './pages/admin/Dashboard';
import StudentDashboard from './pages/student/Dashboard';
import { Sun, Moon } from 'lucide-react';

function App() {
  const { theme, toggleTheme, currentUser } = useStore();

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
        
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<StudentSignup />} />
            <Route
              path="/admin/*"
              element={
                currentUser?.role === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/student/*"
              element={
                currentUser?.role === 'student' ? (
                  <StudentDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: theme === 'dark' ? '#374151' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000',
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;