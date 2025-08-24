// src/utils/firebaseStorageUtils.ts
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString
} from 'firebase/storage';
import { storage } from '@/lib/firebase';

export { getDownloadURL, ref, uploadBytesResumable, uploadString, storage };
