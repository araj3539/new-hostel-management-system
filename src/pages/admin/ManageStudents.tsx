import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { Pencil, Trash2, Plus } from 'lucide-react';

const ManageStudents = () => {
  const users = useStore(state => state.users);
  const rooms = useStore(state => state.rooms);
  const payments = useStore(state => state.payments);
  const { addStudent, updateStudent, deleteStudent } = useStore();

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    address: '',
  });

  const students = users.filter(user => user.role === 'student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateStudent(isEditing, formData);
      setIsEditing(null);
    } else {
      addStudent(formData);
      setIsAdding(false);
    }
    setFormData({
      username: '',
      password: '',
      email: '',
      fullName: '',
      phone: '',
      address: '',
    });
  };

  const handleEdit = (student: any) => {
    setIsEditing(student.id);
    setFormData({
      username: student.username,
      password: student.password,
      email: student.email,
      fullName: student.fullName || '',
      phone: student.phone || '',
      address: student.address || '',
    });
  };

  const handleDelete = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(studentId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Students</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {(isAdding || isEditing) && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Student' : 'Add New Student'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="input mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="input mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="input mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="input mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="input mt-1"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setIsEditing(null);
                  setFormData({
                    username: '',
                    password: '',
                    email: '',
                    fullName: '',
                    phone: '',
                    address: '',
                  });
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Update' : 'Add'} Student
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="pb-4">Name</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Room</th>
                <th className="pb-4">Payment Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {students.map((student) => {
                const studentPayments = payments.filter(p => p.studentId === student.id);
                const latestPayment = studentPayments[studentPayments.length - 1];
                const studentRoom = rooms.find(room => 
                  payments.some(p => p.roomId === room.id && p.studentId === student.id)
                );

                return (
                  <tr key={student.id}>
                    <td className="py-4">
                      {student.fullName || student.username}
                    </td>
                    <td className="py-4">{student.email}</td>
                    <td className="py-4">
                      {studentRoom ? `Room ${studentRoom.number}` : 'Not assigned'}
                    </td>
                    <td className="py-4">
                      {latestPayment ? (
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            latestPayment.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {latestPayment.status}
                        </span>
                      ) : (
                        <span className="text-gray-500">No payments</span>
                      )}
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(student)}
                          className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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

export default ManageStudents;