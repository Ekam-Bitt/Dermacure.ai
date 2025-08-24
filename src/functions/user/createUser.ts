import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const createUser = async (user: any) => {
  const userSnapshot = await getDoc(doc(db, 'users', user.uid));

  if (!userSnapshot.exists()) {
    await setDoc(doc(db, 'users', `${user.uid}`), {
      uid: user.uid,
      name: user.name,
      age: user.age,
      sex: user.sex,
      role: user.role,
      phoneNumber: user.phoneNumber
    });
  } else {
    console.log('User already exists');
  }
};

export default createUser;
