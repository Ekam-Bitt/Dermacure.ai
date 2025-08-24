export default interface IReport {
  patientId: string;
  patientName: string;
  patientAge: number;
  suspectedDisease: {
    diseaseName: string;
    diseaseDescription: string;
  };
  diseaseImage: string;
  isVerifiedByDoc: boolean;
  requestedDocId: string;
  patientPrompt: string[];
}
