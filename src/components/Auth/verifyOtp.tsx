import { HStack, PinInput, PinInputField } from '../../../lib/chakraui';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const VerifyOtp = ({ verificationData, mobileNumber }: any) => {
  const [timer, setTimer] = useState<number>(170);
  const [otpEntered, setOtpEntered] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    timer > -1 &&
      setTimeout(() => {
        timer;
        setTimer(timer - 1);
      }, 1000);
  }, [timer]);

  const handleVerifyOtp = async () => {
    window.localStorage.setItem('mobileNumber', mobileNumber);
    router.push('/profile-create');
  };

  return (
    <div>
      <h1 className="text-2xl text-blueDeep font-semibold mb-2">
        OTP Verification
      </h1>
      <p className="text-sm font-light text-[#00184485] mb-4">
        An OTP has been sent to XXX XXX 8005
      </p>
      <HStack marginBottom={'15px'} spacing={'12px'}>
        <PinInput size={'lg'} onChange={(e: any) => setOtpEntered(e)}>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      {timer === -1 ? (
        <p
          className="w-full text-center mb-4 font-bold cursor-pointer text-blueDeep"
          onClick={() => setTimer(170)}
        >
          Resend OTP
        </p>
      ) : (
        <p className="text-bluePrimary text-center font-bold mb-4 text-xl">
          {timer}
        </p>
      )}
      <button
        className="btn-secondary w-full"
        disabled={otpEntered?.length !== 6}
        onClick={handleVerifyOtp}
      >
        Verify OTP & Proceed
      </button>
    </div>
  );
};

export default VerifyOtp;
