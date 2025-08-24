import IReport from '@/types/reportInterface';
import { db } from '@/lib/firebase';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

const createIssue = async (report: IReport) => {
  try {
    await addDoc(collection(db, 'report'), report);
  } catch (err) {
    
    
  }
};

export default createIssue;
