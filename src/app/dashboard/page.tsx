'use client';
import BotsonicWidget from '@/components/Chatbot/Chatbot.main';
import BotPage from '@/components/Chatbot/Chatbot.openai';
import ChatRoom from '@/components/ChatRoom/ChatRoom.main';
// Remove direct imports of PatientDashboard and DoctorDashboard
// import DoctorDashboard from '@/components/Dashboard/Doctor.dashboard.main';
// import PatientDashboard from '@/components/Dashboard/Doctor.dashboard.main';
import { EClinic } from '@/components/Dashboard/e-clinic.main';
import Navbar from '@/components/Header/Navbar.main';

// Remove useSearchParams and useRouter imports
// import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import React, { useEffect, Suspense, useState } from 'react';
import {
  AiFillThunderbolt,
  AiOutlineThunderbolt,
  AiOutlineUser
} from 'react-icons/ai';
import { BsRobot } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { useUser } from '@/context/usercontext';

import dynamic from 'next/dynamic'; // Import dynamic

// Dynamically import DashboardContent
const DynamicDashboardContent = dynamic(
  () => import('@/components/Dashboard/DashboardContent'),
  { ssr: false }
);

const User = () => {
  // Remove isClient state and useEffect, as DynamicDashboardContent handles client-side rendering
  // const [isClient, setIsClient] = useState(false);
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // Remove useSearchParams and useRouter calls
  // const searchParams = useSearchParams();
  // const router = useRouter();

  const { user } = useUser();
  

  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <div className="bg-blueBackground pb-6">
        <Navbar />
        <DynamicDashboardContent />{' '}
        {/* Render the dynamically imported component */}
      </div>
    </Suspense>
  );
};

export default User;
