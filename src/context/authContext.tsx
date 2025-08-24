import { useState } from 'react';
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut,
  User as FirebaseAuthUser
} from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { auth } from '@/lib/firebase';

export interface IAuthContext {
  authUser: FirebaseAuthUser | null;
  loginWithPhoneNumber: (phoneNumber: string) => any;
  handleOtpVerify: (VerificationCode: string) => any;
  logout: () => any;
}

const defaultValues: IAuthContext = {
  authUser: null,
  loginWithPhoneNumber: () => {},
  handleOtpVerify: () => {},
  logout: () => {}
};

const AuthContext = React.createContext(defaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<FirebaseAuthUser | null>(
    defaultValues.authUser
  );

  function onCaptchVerify(mobileNumber: string) {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            loginWithPhoneNumber(mobileNumber);
          },
          'expired-callback': () => {}
        }
      );
    }
  }

  function loginWithPhoneNumber(mobileNumber: string) {
    onCaptchVerify(mobileNumber);

    const appVerifier = window.recaptchaVerifier;

    const formatPh = '+91' + mobileNumber;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleOtpVerify(verificationCode: string) {
    window.confirmationResult
      .confirm(verificationCode)
      .then(async (res: any) => {
        const user = res.user;
        setAuthUser(user);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  const logout = async () => {
    await signOut(auth);
    window.location.href = '/auth/login';
  };

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setAuthUser(user);
      setIsLoading(false);
    });
  }, [auth]);

  const value = {
    authUser,
    loginWithPhoneNumber,
    handleOtpVerify,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
