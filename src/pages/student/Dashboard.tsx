import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Building,
  MessageSquare,
  CreditCard,
  Clock,
  Settings,
  Bell
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Overview from './Overview';
import Profile from './Profile';
import RoomBooking from './RoomBooking';
import Complaints from './Complaints';
import Payments from './Payments';
import PaymentHistory from './PaymentHistory';
import StudentSettings from './StudentSettings';
import NoticeBoard from './NoticeBoard';

const navigation = [
  {
    name: 'Overview',
    path: '/student',
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: 'Profile',
    path: '/student/profile',
    icon: <User size={18} />,
  },
  {
    name: 'Room Booking',
    path: '/student/booking',
    icon: <Building size={18} />,
  },
  {
    name: 'Complaints',
    path: '/student/complaints',
    icon: <MessageSquare size={18} />,
  },
  {
    name: 'Payments',
    path: '/student/payments',
    icon: <CreditCard size={18} />,
  },
  {
    name: 'Payment History',
    path: '/student/payment-history',
    icon: <Clock size={18} />,
  },
  {
    name: 'Notice Board',
    path: '/student/notices',
    icon: <Bell size={18} />,
  },
  {
    name: 'Settings',
    path: '/student/settings',
    icon: <Settings size={18} />,
  },
];

const StudentDashboard = () => {
  const location = useLocation();

  return (
    <DashboardLayout
      navigation={navigation}
      currentPath={location.pathname}
    >
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking" element={<RoomBooking />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/notices" element={<NoticeBoard />} />
        <Route path="/settings" element={<StudentSettings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StudentDashboard;