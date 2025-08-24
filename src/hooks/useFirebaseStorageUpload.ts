// src/hooks/useFirebaseStorageUpload.ts
import { useAuth } from '../../context/authContext';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  storage
} from '../utils/firebaseStorageUtils'; // Import from our new utility

const useFirebaseStorageUpload = (fileUrl: any) => {
  const { authUser } = useAuth();

  const uploadImageToFirebase = async () => {
    const date = new Date();
    const signatureRef = ref(
      storage,
      `signature${date.getTime()}${authUser?.uid}`
    );

    const uploadTask = fileUrl && uploadBytesResumable(signatureRef, fileUrl);

    if (!uploadTask) {
      return null; // Or handle error
    }

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot: any) => {
          const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) *
            100) as number;
          console.log(progress);
          // You can update a progress state here if needed
        },
        (error: any) => {
          console.error(error);
          reject(error);
        },
        async () => {
          const downloadURLOnUpload = await getDownloadURL(
            uploadTask.snapshot.ref
          );
          console.log(downloadURLOnUpload);
          resolve(downloadURLOnUpload);
        }
      );
    });
  };

  return { uploadImageToFirebase };
};

export default useFirebaseStorageUpload;
