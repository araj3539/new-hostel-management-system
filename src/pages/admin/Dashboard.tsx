import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building,
  ClipboardList,
  MessageSquare,
  Settings,
  Bell
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Overview from './Overview';
import ManageRooms from './ManageRooms';
import ManageStudents from './ManageStudents';
import RoomRequests from './RoomRequests';
import Complaints from './Complaints';
import AdminSettings from './AdminSettings';
import NoticeBoard from './NoticeBoard';

const navigation = [
  {
    name: 'Overview',
    path: '/admin',
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: 'Manage Rooms',
    path: '/admin/rooms',
    icon: <Building size={18} />,
  },
  {
    name: 'Manage Students',
    path: '/admin/students',
    icon: <Users size={18} />,
  },
  {
    name: 'Room Requests',
    path: '/admin/requests',
    icon: <ClipboardList size={18} />,
  },
  {
    name: 'Complaints',
    path: '/admin/complaints',
    icon: <MessageSquare size={18} />,
  },
  {
    name: 'Notice Board',
    path: '/admin/notices',
    icon: <Bell size={18} />,
  },
  {
    name: 'Settings',
    path: '/admin/settings',
    icon: <Settings size={18} />,
  },
];

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <DashboardLayout
      navigation={navigation}
      currentPath={location.pathname}
    >
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/rooms" element={<ManageRooms />} />
        <Route path="/students" element={<ManageStudents />} />
        <Route path="/requests" element={<RoomRequests />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/notices" element={<NoticeBoard />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;