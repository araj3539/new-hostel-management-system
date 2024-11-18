import React from 'react';
import useStore from '../../store/useStore';
import { Users, Building, MessageSquare } from 'lucide-react';

const Overview = () => {
  const rooms = useStore(state => state.rooms);
  const users = useStore(state => state.users);
  const complaints = useStore(state => state.complaints);
  const roomRequests = useStore(state => state.roomRequests);

  const students = users.filter(user => user.role === 'student');
  const activeComplaints = complaints.filter(c => c.status !== 'closed');
  const pendingRequests = roomRequests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Total Students</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {students.length} registered
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Rooms</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {rooms.filter(r => r.status === 'available').length} available
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Active Issues</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {activeComplaints.length} complaints
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Room Requests</h2>
          <div className="space-y-4">
            {pendingRequests.slice(0, 5).map((request) => {
              const room = rooms.find(r => r.id === request.roomId);
              return (
                <div
                  key={request.id}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div>
                    <p className="font-medium">{request.studentInfo.fullName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Room {room?.number}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    Pending
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
          <div className="space-y-4">
            {activeComplaints.slice(0, 5).map((complaint) => {
              const student = users.find(u => u.id === complaint.studentId);
              return (
                <div
                  key={complaint.id}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div>
                    <p className="font-medium">{complaint.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      by {student?.fullName || student?.username}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {complaint.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;