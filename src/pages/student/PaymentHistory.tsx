import React from 'react';
import useStore from '../../store/useStore';
import { format } from 'date-fns';

const PaymentHistory = () => {
  const currentUser = useStore(state => state.currentUser);
  const payments = useStore(state => state.payments);
  const rooms = useStore(state => state.rooms);

  const studentPayments = payments
    .filter(p => p.studentId === currentUser?.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payment History</h1>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="pb-4">Date</th>
                <th className="pb-4">Room</th>
                <th className="pb-4">Month</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {studentPayments.map((payment) => {
                const room = rooms.find(r => r.id === payment.roomId);
                return (
                  <tr key={payment.id}>
                    <td className="py-4">
                      {format(new Date(payment.timestamp), 'MMM d, yyyy')}
                    </td>
                    <td className="py-4">Room {room?.number}</td>
                    <td className="py-4">
                      {payment.month} {payment.year}
                    </td>
                    <td className="py-4">${payment.amount}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          payment.status === 'paid'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;