import React from 'react';

const Footer = () => {
  return (
    <div className="text-[#FFFFFF] bg-black space-y-4">
      <div className="flex md:flex-row flex-col justify-between items-center gap-4 p-4">
        <section>
          <img src="/logo.png" />
        </section>

        <section>
          <h1 className="text-1xl ">KNOW US</h1>
          <section>
            <p>ABOUT US</p>
            <p>PROJECT DETAILS</p>
          </section>
        </section>
        <section>
          <h1>SECURITY</h1>
          <section>
            <p> PRIVACY POLICY</p>
            <p>TERMS OF USE</p>
          </section>
        </section>
        <section>
          <h1>SUPPORT</h1>
          <section>
            <p>FAQ</p>
            <p>REPORT AN ISSUE</p>
          </section>
        </section>
      </div>
      <h1 className="text-center">Where Health Meets Hope</h1>
      <div className="flex md:flex-row flex-col justify-between  px-4">
        <span className="text-1xl">Copyright© SKINCARE.AI 2023</span>
        <span className="text-1xl px-4">Powered by SKINCARE.AI</span>
      </div>
    </div>
  );
};

export default Footer;
