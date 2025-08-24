'use client';
import BotsonicWidget from '@/components/Chatbot/Chatbot.main';
import BotPage from '@/components/Chatbot/Chatbot.openai';
import ChatRoom from '@/components/ChatRoom/ChatRoom.main';
import { EClinic } from '@/components/Dashboard/e-clinic.main';
import PatientDashboard from '@/components/Dashboard/Patient.dashboard.main';
import Navbar from '@/components/Header/Navbar.main';
import React, { useEffect, Suspense } from 'react'; // Import Suspense

const PatientDashboardPage = () => {
  return (
    <>
      <div className="bg-blueBackground pb-6">
        <Navbar />
        <Suspense fallback={<div>Loading Patient Dashboard...</div>}>
          {' '}
          {/* Add Suspense boundary */}
          <PatientDashboard />
        </Suspense>
      </div>
    </>
  );
};

export default PatientDashboardPage;
