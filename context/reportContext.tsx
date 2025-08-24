import { useState } from 'react';
import React, { useContext, useEffect } from 'react';
import { auth } from '../lib/firebaseConfig';
import IReport from '../Interfaces/reportInterface';

export interface IReportContext {
  reportData: IReport;
  setReportData: (reportData: IReport) => void;
}

const defaultValues: IReportContext = {
  reportData: {
    patientId: '',
    patientName: '',
    patientAge: 0,
    suspectedDisease: {
      diseaseName: '',
      diseaseDescription: ''
    },
    diseaseImage: '',
    isVerifiedByDoc: false,
    requestedDocId: '',
    patientPrompt: []
  },
  setReportData: () => {}
};

const ReportContext = React.createContext(defaultValues);

export function useReport() {
  return useContext(ReportContext);
}

export function ReportContextProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reportData, setReportData] = useState<IReport>(
    defaultValues.reportData
  );

  const value = {
    reportData,
    setReportData
  };

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
}
