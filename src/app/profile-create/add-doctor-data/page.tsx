'use client';

import React, { useEffect, useState } from 'react';
import { Input, Select } from '@/lib/chakraui';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Header/Navbar.main';
import IUser from '../../../../Interfaces/userInterface';
import medicalSpecialties from '../../../../data/medialSpeciality';
import { useAuth } from '@/context/authContext';
import updateUserData from '@/functions/user/updateUserData';
import useFirebaseStorageUpload from '../../../../src/hooks/useFirebaseStorageUpload'; // Regular import

const CreateDoctorProfile = () => {
  const [docData, setDocData] = useState<Partial<IUser>>({
    docSignature: '',
    docLicense: '',
    docSpeciality: ''
  });

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState<any>(null);
  const router = useRouter();
  const { authUser } = useAuth();

  const { uploadImageToFirebase } = useFirebaseStorageUpload(fileUrl);


  const validateForm = () => {
    if (
      docData.docSignature === '' ||
      docData.docLicense === '' ||
      docData.docSpeciality === ''
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleUpdateDocData = async () => {
    const signatureUrl = await uploadImageToFirebase();
    
    const data = {
      docLicense: docData.docLicense as string,
      docSignature: signatureUrl as unknown as string,
      docSpeciality: docData.docSpeciality as string
    };
    await updateUserData(authUser?.uid, data);
    router.push('/dashboard?currentTab=E-Clinic');
  };

  const addImagetoPost = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      setFileUrl(e.target.files[0])
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = readerEvent => {
      readerEvent.target?.result && setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <div className="min-h-screen bg-blueBackground">
      <Navbar />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="bg-white  max-w-[70vw] min-w-[50vw] shadow-xl p-6 rounded-2xl text-md justify-items-stretch space-y-6">
          <h1 className="text-1.5xl">Add your doctor details</h1>
          <section>
            <h2 className="font-medium mb-2">Doc License No: </h2>
            <Input
              type="text"
              backgroundColor={'#FBFAFF'}
              focusBorderColor="#1A75FF"
              placeholder="Enter your Doc License Number"
              size={'md'}
              value={docData.docLicense}
              onChange={e =>
                setDocData((prev: any) => {
                  return {
                    ...prev,
                    docLicense: e.target.value
                  };
                })
              }
              fontSize="base"
            />
          </section>
          <section>
            <h2 className="font-medium mb-2">Speciality</h2>
            <Select
              backgroundColor={'#FBFAFF'}
              focusBorderColor="#1A75FF"
              placeholder="--select--"
              size={'md'}
              value={docData.docSpeciality}
              onChange={e =>
                setDocData((prev: any) => {
                  return {
                    ...prev,
                    docSpeciality: e.target.value
                  };
                })
              }
              fontSize="base"
            >
              {medicalSpecialties.map((specialties, i) => {
                return (
                  <option key={i} value={specialties}>
                    {specialties}
                  </option>
                );
              })}
            </Select>
          </section>
          <section>
            <h2 className="font-medium mb-1">Signature</h2>
            <p className="text-sm mb-2 font-extralight">
              Your signature will only be used to prepare medical reports and
              validation
            </p>
            {selectedFile ? (
              <img
                src={selectedFile}
                className="h-[10rem] w-full object-contain"
                alt="image of signature"
                onClick={() => setSelectedFile(null)}
              />
            ) : (
              <Input
                type="file"
                backgroundColor={'#FBFAFF'}
                focusBorderColor="#1A75FF"
                onChange={e => {
                  addImagetoPost(e);
                }}
              />
            )}
          </section>

          <button
            className="btn-secondary w-full rounded-md"
            disabled={!validateForm()}
            onClick={handleUpdateDocData}
          >
            Submit & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDoctorProfile;