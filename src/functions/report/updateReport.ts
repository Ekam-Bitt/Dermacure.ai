import { doc, updateDoc } from 'firebase/firestore';
import IUser from '@/types/userInterface';
import { db } from '@/lib/firebase';
import IReport from '@/types/reportInterface';

export default async function updateUserData(
  reportId: string | undefined,
  data: Partial<IReport>
) {
  try {
    const userDocRef = doc(db, `report/${reportId}`);
    await updateDoc(userDocRef, data);
  } catch (err) {
  }
}
