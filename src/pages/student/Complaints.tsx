import React, { useState } from 'react';
import useStore from '../../store/useStore';

const Complaints = () => {
  const currentUser = useStore(state => state.currentUser);
  const complaints = useStore(state => state.complaints);
  const createComplaint = useStore(state => state.createComplaint);
  const [isCreating, setIsCreating] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
  });

  const studentComplaints = complaints.filter(
    c => c.studentId === currentUser?.id
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      createComplaint({
        studentId: currentUser.id,
        title: newComplaint.title,
        description: newComplaint.description,
      });
      setNewComplaint({ title: '', description: '' });
      setIsCreating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Complaints</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="btn btn-primary"
        >
          New Complaint
        </button>
      </div>

      {isCreating && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Create New Complaint</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                value={newComplaint.title}
                onChange={e => setNewComplaint(prev => ({ ...prev, title: e.target.value }))}
                className="input mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={newComplaint.description}
                onChange={e => setNewComplaint(prev => ({ ...prev, description: e.target.value }))}
                className="input mt-1"
                rows={4}
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {studentComplaints.map((complaint) => (
          <div key={complaint.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{complaint.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(complaint.timestamp).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                  complaint.status
                )}`}
              >
                {complaint.status}
              </span>
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              {complaint.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;