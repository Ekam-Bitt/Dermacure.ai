import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiDocument } from 'react-icons/hi';
import Appointment from './Appointment/Appointment.main';

const DoctorDashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get('currentTab');
  return (
    <div className="mx-8 py-6 min-h-[90vh] flex justify-between gap-8">
      <div className="max-w-[20vw] space-y-4 w-full">
        <section
          className="cursor-pointer hover:scale-105 duration-200 flex bg-white justify-start items-center space-x-2 text-blueDeep px-4 py-2.5 shadow-lg font-medium rounded-lg"
          onClick={() => router.push('/dashboard?currentTab=Appointments')}
        >
          {currentTab !== 'E-Clinic' ? (
            <HiDocument size={'36px'} color="#1A75FF" />
          ) : (
            <HiDocument size={'36px'} color="#1A75FF" />
          )}
          <span>Appointments</span>
        </section>
      </div>
      <div className="bg-white shadow-lg rounded-md w-full py-4 px-6">
        {currentTab === 'Appointments' && <Appointment />}
      </div>
    </div>
  );
};

export default DoctorDashboard;
