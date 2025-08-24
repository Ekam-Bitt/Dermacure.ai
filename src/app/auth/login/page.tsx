'use client';
import Navbar from '@/components/Header/Navbar.main';
import React from 'react';
import OtpLogin from '@/components/Auth/OtpLogin';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300"> {/* Softer gradient background */}
      <Navbar />
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] py-8"> {/* Adjusted height, added padding */}
        <div className="bg-white max-w-4xl w-full mx-4 p-8 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center"> {/* Refined max-width, padding, shadow, responsiveness */}
          <div className="hidden md:flex justify-center items-center"> {/* Image container, hidden on small screens */}
            <img
              src="/login.png"
              alt="Login illustration" // Added alt text
              className="w-full h-auto object-contain rounded-xl bg-blue-50" // Softer image background
            />
          </div>
          <div className="flex flex-col justify-center"> {/* Container for OtpLogin */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome!</h1> {/* Added a title */}
            <OtpLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;