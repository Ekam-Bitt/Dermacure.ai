import React from 'react';
import CustomTabs from './benefits.card';
import Image from 'next/image';

export default function Benefits() {
  return (
    <div id="benefits" className="bg-[#15B9FF] w-screen pt-24">
      <h1 className="text-3xl pl-8">Benefits</h1>
      <div className="relative inset-0">
        <div className="flex flex-col-reverse gap-4 lg:flex-row flex-wrap items-start max-w-full m-auto py-12">
          <div className="md:w-[67vw] md:mb-6 lg:w-[50vw] mb-12 pr-12 md:pr-0">
            <Image src="/skin.svg" alt="skin" className="sm:pr-8"/>
          </div>
          <div className=" w-full m-auto lg:m-0 md:w-[67%] lg:w-[40%] lg:ml-20">
            <CustomTabs />
          </div>
        </div>
        <h1 className=" absolute inset-0 z-30 top-[950px] lg:top-[500px] w-full text-2xl md:text-4xl lg:text-7xl text-center justify-center flex items-center text-white">
          The Future of Dermatology
          <br />
          at your finger tips...
        </h1>
      </div>
      <div className=" w-screen h-[vw] bg-gradient-to-b from-[#15B9FF] to-[#76D6FF]">
        <Image src="/Ellipse.svg" alt="Gradient circle" className="w-screen" />
      </div>
    </div>
  );
}
