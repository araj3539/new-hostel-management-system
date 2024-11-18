export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'student';
  fullName?: string;
  phone?: string;
  address?: string;
}

export interface Room {
  id: string;
  number: string;
  capacity: number;
  price: number;
  occupied: number;
  status: 'available' | 'full';
}

export interface RoomRequest {
  id: string;
  studentId: string;
  roomId: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
  studentInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface Complaint {
  id: string;
  studentId: string;
  title: string;
  description: string;
  status: 'open' | 'processing' | 'resolved' | 'closed';
  timestamp: string;
}

export interface Payment {
  id: string;
  studentId: string;
  roomId: string;
  amount: number;
  timestamp: string;
  month: string;
  year: number;
  status: 'paid' | 'pending';
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  important: boolean;
}