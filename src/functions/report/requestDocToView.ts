import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebaseConfig';

export default async function requestedDocToView(
  reportId: string,
  docid: string
) {
  try {
    const reportRef = doc(db, `report/${reportId}`);
    await updateDoc(reportRef, {
      requestedDocId: docid
    });
  } catch (e) {
    console.log(e);
  }
}
