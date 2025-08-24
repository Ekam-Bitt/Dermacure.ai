import React, { useEffect, useState } from 'react';
import AppointmentCard from './Appointment.card';
import IReport from '../../../types/reportInterface';
import getAllReports from '@/functions/report/getAllReports';

const Appointment = () => {
  const [reports, setReports] = useState<IReport[]>([]);

  const handleReportFetch = async () => {
    let _reports = [...reports];
    const array = await getAllReports();
    array?.map(rep => {
      return _reports.push(rep as IReport);
    });

    

    setReports(_reports);
  };

  useEffect(() => {
    handleReportFetch();
  }, [handleReportFetch]);
  return (
    <div className="text-black space-y-3">
      <h1 className="text-xl">All Your Appointments</h1>
      <p>All your previous pending cases...</p>
      {reports.map((rep, id) => {
        return <AppointmentCard key={id} report={rep} />;
      })}
    </div>
  );
};

export default Appointment;
