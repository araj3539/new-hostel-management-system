import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../store/useStore';
import AuthLayout from '../components/AuthLayout';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useStore(state => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(username, password);
    
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/student');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <AuthLayout title="Sign in to your account">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-600 text-center text-sm">{error}</div>
        )}
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary w-full">
            Sign in
          </button>
        </div>

        <div className="text-center">
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-500 text-sm"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;