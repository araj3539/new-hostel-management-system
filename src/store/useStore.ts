import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Room, RoomRequest, Complaint, Payment, Notice } from '../types';
import toast from 'react-hot-toast';

interface State {
  users: User[];
  rooms: Room[];
  roomRequests: RoomRequest[];
  complaints: Complaint[];
  payments: Payment[];
  notices: Notice[];
  currentUser: User | null;
  theme: 'light' | 'dark';
  
  // Auth actions
  login: (username: string, password: string) => User | null;
  logout: () => void;
  registerStudent: (userData: Omit<User, 'id' | 'role'>) => void;
  
  // User management
  addStudent: (userData: Omit<User, 'id' | 'role'>) => void;
  updateStudent: (userId: string, userData: Partial<User>) => void;
  deleteStudent: (userId: string) => void;
  
  // Room actions
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (room: Room) => void;
  deleteRoom: (roomId: string) => void;
  
  // Request actions
  createRoomRequest: (request: Omit<RoomRequest, 'id' | 'timestamp' | 'status'>) => void;
  updateRoomRequest: (requestId: string, status: 'approved' | 'rejected') => void;
  
  // Complaint actions
  createComplaint: (complaint: Omit<Complaint, 'id' | 'timestamp' | 'status'>) => void;
  updateComplaintStatus: (complaintId: string, status: Complaint['status']) => void;
  
  // Payment actions
  createPayment: (payment: Omit<Payment, 'id' | 'timestamp'>) => void;
  
  // Notice actions
  addNotice: (notice: Omit<Notice, 'id' | 'timestamp'>) => void;
  updateNotice: (noticeId: string, notice: Partial<Notice>) => void;
  deleteNotice: (noticeId: string) => void;
  
  // Theme action
  toggleTheme: () => void;
}

const useStore = create<State>()(
  persist(
    (set, get) => ({
      users: [
        {
          id: '1',
          username: 'admin',
          password: '123456',
          email: 'admin@hostel.com',
          role: 'admin'
        }
      ],
      rooms: [],
      roomRequests: [],
      complaints: [],
      payments: [],
      notices: [],
      currentUser: null,
      theme: 'light',

      login: (username, password) => {
        const user = get().users.find(
          u => u.username === username && u.password === password
        );
        if (user) {
          set({ currentUser: user });
          toast.success(`Welcome back, ${user.fullName || user.username}!`);
          return user;
        }
        toast.error('Invalid username or password');
        return null;
      },

      logout: () => {
        set({ currentUser: null });
        toast.success('Logged out successfully');
      },

      registerStudent: (userData) => {
        const newUser: User = {
          ...userData,
          id: crypto.randomUUID(),
          role: 'student'
        };
        set(state => ({ users: [...state.users, newUser] }));
        toast.success('Registration successful! Please login.');
      },

      addStudent: (userData) => {
        const newUser: User = {
          ...userData,
          id: crypto.randomUUID(),
          role: 'student'
        };
        set(state => ({ users: [...state.users, newUser] }));
        toast.success('Student added successfully');
      },

      updateStudent: (userId, userData) => {
        set(state => ({
          users: state.users.map(user =>
            user.id === userId ? { ...user, ...userData } : user
          )
        }));
        toast.success('Student updated successfully');
      },

      deleteStudent: (userId) => {
        set(state => ({
          users: state.users.filter(user => user.id !== userId)
        }));
        toast.success('Student deleted successfully');
      },

      addRoom: (roomData) => {
        const newRoom: Room = {
          ...roomData,
          id: crypto.randomUUID()
        };
        set(state => ({ rooms: [...state.rooms, newRoom] }));
        toast.success('Room added successfully');
      },

      updateRoom: (room) => {
        set(state => ({
          rooms: state.rooms.map(r => r.id === room.id ? room : r)
        }));
        toast.success('Room updated successfully');
      },

      deleteRoom: (roomId) => {
        set(state => ({
          rooms: state.rooms.filter(r => r.id !== roomId)
        }));
        toast.success('Room deleted successfully');
      },

      createRoomRequest: (requestData) => {
        const newRequest: RoomRequest = {
          ...requestData,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          status: 'pending'
        };
        set(state => ({
          roomRequests: [...state.roomRequests, newRequest]
        }));
        toast.success('Room request submitted successfully');
      },

      updateRoomRequest: (requestId, status) => {
        const state = get();
        const request = state.roomRequests.find(r => r.id === requestId);
        
        if (!request) return;
        
        const room = state.rooms.find(r => r.id === request.roomId);
        
        if (!room) return;
        
        if (status === 'approved') {
          const updatedRoom = {
            ...room,
            occupied: room.occupied + 1,
            status: room.occupied + 1 >= room.capacity ? 'full' : 'available'
          };
          
          const now = new Date();
          const payment: Payment = {
            id: crypto.randomUUID(),
            studentId: request.studentId,
            roomId: room.id,
            amount: room.price,
            timestamp: now.toISOString(),
            month: now.toLocaleString('default', { month: 'long' }),
            year: now.getFullYear(),
            status: 'pending'
          };
          
          set(state => ({
            roomRequests: state.roomRequests.map(req =>
              req.id === requestId ? { ...req, status } : req
            ),
            rooms: state.rooms.map(r =>
              r.id === room.id ? updatedRoom : r
            ),
            payments: [...state.payments, payment]
          }));
          toast.success('Room request approved');
        } else {
          set(state => ({
            roomRequests: state.roomRequests.map(req =>
              req.id === requestId ? { ...req, status } : req
            )
          }));
          toast.success('Room request rejected');
        }
      },

      createComplaint: (complaintData) => {
        const newComplaint: Complaint = {
          ...complaintData,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          status: 'open'
        };
        set(state => ({
          complaints: [...state.complaints, newComplaint]
        }));
        toast.success('Complaint submitted successfully');
      },

      updateComplaintStatus: (complaintId, status) => {
        set(state => ({
          complaints: state.complaints.map(complaint =>
            complaint.id === complaintId ? { ...complaint, status } : complaint
          )
        }));
        toast.success('Complaint status updated');
      },

      createPayment: (paymentData) => {
        const newPayment: Payment = {
          ...paymentData,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString()
        };
        set(state => ({
          payments: [...state.payments, newPayment]
        }));
        toast.success('Payment successful');
      },

      addNotice: (noticeData) => {
        const newNotice: Notice = {
          ...noticeData,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString()
        };
        set(state => ({
          notices: [...state.notices, newNotice]
        }));
        toast.success('Notice added successfully');
      },

      updateNotice: (noticeId, noticeData) => {
        set(state => ({
          notices: state.notices.map(notice =>
            notice.id === noticeId ? { ...notice, ...noticeData } : notice
          )
        }));
        toast.success('Notice updated successfully');
      },

      deleteNotice: (noticeId) => {
        set(state => ({
          notices: state.notices.filter(notice => notice.id !== noticeId)
        }));
        toast.success('Notice deleted successfully');
      },

      toggleTheme: () => {
        set(state => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        }));
      }
    }),
    {
      name: 'hostel-storage'
    }
  )
);

export default useStore;