import React, { useState } from 'react';
import useStore from '../../store/useStore';

const RoomBooking = () => {
  const currentUser = useStore(state => state.currentUser);
  const rooms = useStore(state => state.rooms);
  const createRoomRequest = useStore(state => state.createRoomRequest);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handleRequest = () => {
    if (selectedRoom && currentUser) {
      createRoomRequest({
        studentId: currentUser.id,
        roomId: selectedRoom,
        studentInfo: {
          fullName: currentUser.fullName || '',
          email: currentUser.email,
          phone: currentUser.phone || '',
          address: currentUser.address || '',
        },
      });
      setSelectedRoom(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Room Booking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`card cursor-pointer transition-all ${
              selectedRoom === room.id
                ? 'ring-2 ring-blue-500'
                : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedRoom(room.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Room {room.number}</h3>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  room.status === 'available'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}
              >
                {room.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Capacity: {room.capacity} persons</p>
              <p>Currently occupied: {room.occupied}</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${room.price}/month
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className="fixed bottom-8 right-8">
          <button
            onClick={handleRequest}
            className="btn btn-primary"
          >
            Request Selected Room
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomBooking;