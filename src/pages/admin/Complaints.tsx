import React from 'react';
import useStore from '../../store/useStore';

const Complaints = () => {
  const complaints = useStore(state => state.complaints);
  const users = useStore(state => state.users);
  const updateComplaintStatus = useStore(state => state.updateComplaintStatus);

  const handleStatusUpdate = (
    complaintId: string,
    status: 'open' | 'processing' | 'resolved' | 'closed'
  ) => {
    updateComplaintStatus(complaintId, status);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Complaints</h1>

      <div className="space-y-4">
        {complaints.map((complaint) => {
          const student = users.find(u => u.id === complaint.studentId);
          
          return (
            <div key={complaint.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{complaint.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    by {student?.fullName || student?.username}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(complaint.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <select
                  value={complaint.status}
                  onChange={(e) => handleStatusUpdate(complaint.id, e.target.value as any)}
                  className="px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                >
                  <option value="open">Open</option>
                  <option value="processing">Processing</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <p className="text-gray-700 dark:text-gray-300">
                {complaint.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Complaints;