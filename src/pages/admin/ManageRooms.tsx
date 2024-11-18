import React, { useState } from 'react';
import useStore from '../../store/useStore';

const ManageRooms = () => {
  const rooms = useStore(state => state.rooms);
  const addRoom = useStore(state => state.addRoom);
  const updateRoom = useStore(state => state.updateRoom);
  const deleteRoom = useStore(state => state.deleteRoom);
  const [isAdding, setIsAdding] = useState(false);
  const [newRoom, setNewRoom] = useState({
    number: '',
    capacity: 1,
    price: 0,
    occupied: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRoom({
      ...newRoom,
      status: 'available',
    });
    setNewRoom({ number: '', capacity: 1, price: 0, occupied: 0 });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Rooms</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-primary"
        >
          Add Room
        </button>
      </div>

      {isAdding && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Add New Room</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Room Number
              </label>
              <input
                type="text"
                value={newRoom.number}
                onChange={e => setNewRoom(prev => ({ ...prev, number: e.target.value }))}
                className="input mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Capacity
              </label>
              <input
                type="number"
                value={newRoom.capacity}
                onChange={e => setNewRoom(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                className="input mt-1"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price per Month
              </label>
              <input
                type="number"
                value={newRoom.price}
                onChange={e => setNewRoom(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                className="input mt-1"
                min="0"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Room
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Room {room.number}</h3>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  room.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {room.status}
              </span>
            </div>
            <div className="space-y-2">
              <p>Capacity: {room.capacity} persons</p>
              <p>Occupied: {room.occupied}</p>
              <p className="text-lg font-semibold">${room.price}/month</p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => deleteRoom(room.id)}
                className="btn btn-secondary text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRooms;