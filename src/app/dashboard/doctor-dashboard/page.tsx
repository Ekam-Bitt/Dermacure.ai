'use client';
import DoctorDashboard from '@/components/Dashboard/Doctor.dashboard.main';
import Navbar from '@/components/Header/Navbar.main';
import React, { useEffect, Suspense } from 'react';

const DoctorDashboardPage = () => {
  return (
    <>
      <div className="bg-blueBackground pb-6">
        <Navbar />
        <Suspense fallback={<div>Loading Doctor Dashboard...</div>}> {/* Add Suspense boundary */}
          <DoctorDashboard />
        </Suspense>
      </div>
    </>
  );
};

export default DoctorDashboardPage;
