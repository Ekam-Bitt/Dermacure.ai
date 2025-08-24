import { collection, getDocs, query, where } from 'firebase/firestore';
import IReport from '@/types/reportInterface';
import { db } from '@/lib/firebase';

export default async function getReportByDocId(
  docid: string,
  patientId: string
) {
  let reportDataAll: Partial<IReport>[] = [];
  try {
    if (docid) {
      const q = query(
        collection(db, `report`),
        where('requestedDocId', '==', docid),
        where('patientId', '==', patientId)
      );
      const reportDataSnap = await getDocs(q);
      if (reportDataSnap.empty) {
        return null;
      } else {
        reportDataSnap.forEach(doc => {
          reportDataAll.push({ ...doc.data() });
        });
        return reportDataAll;
      }
    }
  } catch (err) {}
}
