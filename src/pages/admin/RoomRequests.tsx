import React from 'react';
import useStore from '../../store/useStore';

const RoomRequests = () => {
  const roomRequests = useStore(state => state.roomRequests);
  const rooms = useStore(state => state.rooms);
  const updateRoomRequest = useStore(state => state.updateRoomRequest);

  const handleAction = (requestId: string, status: 'approved' | 'rejected') => {
    updateRoomRequest(requestId, status);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Room Requests</h1>

      <div className="space-y-4">
        {roomRequests.map((request) => {
          const room = rooms.find(r => r.id === request.roomId);
          
          return (
            <div key={request.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {request.studentInfo.fullName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Room {room?.number}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    request.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : request.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {request.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p>Email: {request.studentInfo.email}</p>
                <p>Phone: {request.studentInfo.phone}</p>
                <p>Address: {request.studentInfo.address}</p>
              </div>

              {request.status === 'pending' && (
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => handleAction(request.id, 'rejected')}
                    className="btn btn-secondary"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(request.id, 'approved')}
                    className="btn btn-primary"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomRequests;