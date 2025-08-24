import { doc, updateDoc } from 'firebase/firestore';
import IUser from '@/types/userInterface';
import { db } from '@/lib/firebase';

export default async function updateUserData(
  userid: string | undefined,
  data: Partial<IUser>
) {
  try {
    const userDocRef = doc(db, `users/${userid}`);
    await updateDoc(userDocRef, data);
  } catch (err) {
  }
}
