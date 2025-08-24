'use client';

import React, { useEffect, useState } from 'react';
import { Input, Select } from '@/lib/chakraui';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Header/Navbar.main';
import IUser from '../../../Interfaces/userInterface';
import { useAuth } from '@/context/authContext';
import createUser from '@/functions/user/createUser';

const CreateProfile = () => {
  const [userData, setUserData] = useState<IUser>({
    name: '',
    role: '',
    age: 0,
    sex: '',
    phoneNumber: '',
    dateOfBirth: ''
  });
  const router = useRouter();
  const { authUser } = useAuth();

  const validateForm = () => {
    if (
      userData.name === '' ||
      userData.role === '' ||
      userData.age === 0 ||
      userData.sex === ''
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleCreateUser = async () => {
    const data = {
      name: userData.name,
      age: userData.age,
      sex: userData.sex,
      role: userData.role,
      phoneNumber: authUser?.phoneNumber,
      uid: authUser?.uid
    };
    await createUser(data);
    if (userData.role === 'Doctor') {
      router.push('/profile-create/add-doctor-data');
    } else {
      router.push('dashboard?currentTab=E-Clinic');
    }
  };

  return (
    <div className="min-h-screen bg-blueBackground">
      <Navbar />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="bg-white  max-w-[70vw] min-w-[50vw] shadow-xl p-6 rounded-2xl text-md justify-items-stretch space-y-4">
          <h1 className="text-1.5xl">Add your personal details</h1>
          <section>
            <h2 className="font-medium mb-2">Name</h2>
            <Input
              type="text"
              backgroundColor={'#FBFAFF'}
              focusBorderColor="#1A75FF"
              placeholder="Enter your Name"
              size={'md'}
              value={userData.name}
              onChange={e =>
                setUserData((prev: any) => {
                  return {
                    ...prev,
                    name: e.target.value
                  };
                })
              }
              fontSize="base"
            />
          </section>
          <section>
            <h2 className="font-medium mb-2">Role</h2>
            <Select
              backgroundColor={'#FBFAFF'}
              focusBorderColor="#1A75FF"
              placeholder="--select--"
              size={'md'}
              value={userData.role}
              onChange={e =>
                setUserData((prev: any) => {
                  return {
                    ...prev,
                    role: e.target.value
                  };
                })
              }
              fontSize="base"
            >
              <option value={'Doctor'}>Doctor</option>
              <option value={'Patient'}>Patient</option>
            </Select>
          </section>
          <section>
            <h2 className="font-medium mb-2">Age</h2>
            <Input
              type="number"
              backgroundColor={'#FBFAFF'}
              focusBorderColor="#1A75FF"
              placeholder="Enter your Age"
              size={'md'}
              fontSize="base"
              value={userData.age}
              onChange={e =>
                setUserData((prev: any) => {
                  return {
                    ...prev,
                    age: e.target.value
                  };
                })
              }
            />
          </section>
          <section>
            <h2 className="font-medium mb-2">Gender</h2>
            <Select
              backgroundColor={'#FBFAFF'}
              placeholder="--select--"
              focusBorderColor="#1A75FF"
              size={'md'}
              value={userData.sex}
              onChange={e =>
                setUserData((prev: any) => {
                  return {
                    ...prev,
                    sex: e.target.value
                  };
                })
              }
              fontSize="base"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Trans</option>
            </Select>
          </section>

          <button
            className="btn-secondary w-full rounded-md"
            disabled={!validateForm()}
            onClick={handleCreateUser}
          >
            Submit & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
