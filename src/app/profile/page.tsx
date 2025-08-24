'use client';
import Navbar from '@/components/Header/Navbar.main';
import { useUser } from '@/context/usercontext';
import { Avatar, Input, Select } from '@/lib/chakraui';
import React from 'react';

const AccountDetails = () => {
  const { user } = useUser();
  return (
    <div className="bg-sky-200 min-h-screen">
      <Navbar />
      <div className="space-y-6 px-6 md:px-12 xl:px-20 py-4 ">
        <div className=" p-8 bg-white h-[80vh] rounded-xl shadow-xl">
          <section className="flex justify-start space-x-4 items-center mb-12">
            <Avatar name={user?.name} size="2xl" />
            <div>
              <h1 className="text-2xl font-semibold">{user?.name}</h1>
              <h3 className="text-lg font-semibold">({user?.role})</h3>
            </div>
          </section>
          <div className="grid grid-cols-5 gap-4 place-content-center items-center">
            <section className="col-span-2">
              <h1 className="text-xl font-medium mb-1">Age</h1>
            </section>
            <section className="col-span-3">
              <Input
                type="text"
                backgroundColor={'#FBFAFF'}
                focusBorderColor="#1A75FF"
                placeholder="abc@gmail.com"
                size={'md'}
                fontSize="base"
                value={user?.age}
                readOnly
              />
            </section>
          </div>
          <hr className="my-2" />
          <div className="grid grid-cols-5 gap-4 place-content-center items-center">
            <section className="col-span-2">
              <h1 className="text-xl font-medium mb-1">Gender</h1>
            </section>
            <section className="col-span-3">
              <Input
                backgroundColor={'#FBFAFF'}
                focusBorderColor="#1A75FF"
                size={'md'}
                defaultValue={user?.sex}
                fontSize="base"
              />
            </section>
          </div>
          <hr className="my-2" />
          <div className="grid grid-cols-5 gap-4 place-content-center items-center">
            <section className="col-span-2">
              <h1 className="text-xl font-medium mb-1">Mobile Number</h1>
            </section>
            <section className="col-span-3">
              <Input
                type="text"
                backgroundColor={'#FBFAFF'}
                focusBorderColor="#1A75FF"
                size={'md'}
                fontSize="base"
                value={user?.phoneNumber}
                readOnly
              />
            </section>
          </div>
          <hr className="my-2" />
          <div className="grid grid-cols-5 gap-4 place-content-center items-center">
            <section className="col-span-2">
              <h1 className="text-xl font-medium mb-1">Previous Cases</h1>
            </section>
            <section className="col-span-3">
              <h1>No Previous Cases Yet!!</h1>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
