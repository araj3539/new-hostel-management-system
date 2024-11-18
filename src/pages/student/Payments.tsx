import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { format } from 'date-fns';

const Payments = () => {
  const currentUser = useStore(state => state.currentUser);
  const rooms = useStore(state => state.rooms);
  const payments = useStore(state => state.payments);
  const createPayment = useStore(state => state.createPayment);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
  });

  const studentRoom = rooms.find(room => 
    payments.some(p => p.roomId === room.id && p.studentId === currentUser?.id)
  );

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && studentRoom) {
      const now = new Date();
      createPayment({
        studentId: currentUser.id,
        roomId: studentRoom.id,
        amount: studentRoom.price,
        month: format(now, 'MMMM'),
        year: now.getFullYear(),
        status: 'paid',
      });
      setShowPaymentForm(false);
      setCardDetails({ number: '', expiry: '', cvc: '' });
    }
  };

  if (!studentRoom) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        <div className="card">
          <p>No room assigned. Please request a room first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payments</h1>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Room Details</h2>
        <div className="space-y-2">
          <p>Room Number: {studentRoom.number}</p>
          <p>Monthly Rent: ${studentRoom.price}</p>
        </div>
      </div>

      {!showPaymentForm ? (
        <div className="flex justify-end">
          <button
            onClick={() => setShowPaymentForm(true)}
            className="btn btn-primary"
          >
            Make Payment
          </button>
        </div>
      ) : (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Card Number
              </label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={e => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                className="input mt-1"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={e => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                  className="input mt-1"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  CVC
                </label>
                <input
                  type="text"
                  value={cardDetails.cvc}
                  onChange={e => setCardDetails(prev => ({ ...prev, cvc: e.target.value }))}
                  className="input mt-1"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowPaymentForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Pay ${studentRoom.price}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Payments;