import React from 'react';
import useStore from '../../store/useStore';
import { Building, MessageSquare, CreditCard } from 'lucide-react';

const Overview = () => {
  const currentUser = useStore(state => state.currentUser);
  const rooms = useStore(state => state.rooms);
  const complaints = useStore(state => state.complaints);
  const payments = useStore(state => state.payments);

  const studentComplaints = complaints.filter(c => c.studentId === currentUser?.id);
  const studentPayments = payments.filter(p => p.studentId === currentUser?.id);
  const studentRoom = rooms.find(room => 
    payments.some(p => p.roomId === room.id && p.studentId === currentUser?.id)
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Room Status</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {studentRoom ? `Room ${studentRoom.number}` : 'No room assigned'}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Active Complaints</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {studentComplaints.filter(c => c.status !== 'closed').length} open
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Latest Payment</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {studentPayments.length > 0
                  ? new Date(studentPayments[studentPayments.length - 1].timestamp).toLocaleDateString()
                  : 'No payments yet'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[...studentComplaints, ...studentPayments]
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 5)
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                {'amount' in item ? (
                  <CreditCard className="h-5 w-5 text-green-500" />
                ) : (
                  <MessageSquare className="h-5 w-5 text-orange-500" />
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    {'amount' in item
                      ? `Payment of $${item.amount}`
                      : item.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;