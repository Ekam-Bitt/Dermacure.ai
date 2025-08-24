// src/components/Dashboard/DashboardContent.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import PatientDashboard from './Patient.dashboard.main'; // Assuming correct path
import DoctorDashboard from './Doctor.dashboard.main'; // Assuming correct path
import { useUser } from '@/context/usercontext';

const DashboardContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useUser();

  // You can keep any useEffects or other logic here that depends on searchParams or router

  return (
    <>
      {user?.role === 'Patient' && <PatientDashboard />}
      {user?.role === 'Doctor' && <DoctorDashboard />}
    </>
  );
};

export default DashboardContent;
