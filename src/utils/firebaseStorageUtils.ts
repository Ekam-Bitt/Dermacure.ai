// src/utils/firebaseStorageUtils.ts
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString
} from 'firebase/storage';
import { storage } from '../../lib/firebaseConfig'; // Assuming this path is correct

export { getDownloadURL, ref, uploadBytesResumable, uploadString, storage };
