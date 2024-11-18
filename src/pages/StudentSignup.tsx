import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import AuthLayout from '../components/AuthLayout';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const registerStudent = useStore(state => state.registerStudent);
  const users = useStore(state => state.users);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if username already exists
    if (users.some(user => user.username === formData.username)) {
      setError('Username already exists');
      return;
    }

    registerStudent(formData);
    navigate('/login');
  };

  return (
    <AuthLayout title="Create your account">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-600 text-center text-sm">{error}</div>
        )}
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="input mt-1"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input mt-1"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input mt-1"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="input mt-1"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="input mt-1"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              className="input mt-1"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary w-full">
            Sign up
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default StudentSignup;