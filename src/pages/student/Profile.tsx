import React, { useState } from 'react';
import useStore from '../../store/useStore';

const Profile = () => {
  const currentUser = useStore(state => state.currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update profile logic would go here
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-secondary"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input mt-1"
              />
            ) : (
              <p className="mt-1 text-gray-900 dark:text-gray-100">
                {currentUser?.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input mt-1"
              />
            ) : (
              <p className="mt-1 text-gray-900 dark:text-gray-100">
                {currentUser?.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input mt-1"
              />
            ) : (
              <p className="mt-1 text-gray-900 dark:text-gray-100">
                {currentUser?.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Address
            </label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input mt-1"
              />
            ) : (
              <p className="mt-1 text-gray-900 dark:text-gray-100">
                {currentUser?.address}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;