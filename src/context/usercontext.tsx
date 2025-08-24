'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';

import React, { useContext } from 'react';
import { CircularProgress } from '@chakra-ui/react';
import { useAuth } from './authContext';
import IUser from '../Interfaces/userInterface';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface IDefaultValues {
  user: null | IUser;
  setUser: Dispatch<SetStateAction<any | null>>;
}

const defaultValues: IDefaultValues = {
  user: null,
  setUser: () => {}
};

const userContext = React.createContext(defaultValues);

export function useUser() {
  return useContext(userContext);
}

export function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>(defaultValues.user);
  const [loading, setLoading] = useState<boolean>(false);

  const { authUser } = useAuth();
  const [loader, setLoader] = useState(false);

  const getUserData = useCallback(async () => {
    setLoader(true);
    try {
      if (authUser) {
        const uid = authUser.uid;
        onSnapshot(doc(db, 'users', uid), async doc => {
          if (doc.data() !== undefined) {
            let userData = { ...doc.data(), uid: doc.id };
            setUser(userData as IUser);
          }
        });
      }
    } catch (e) {
      
    }
    setLoader(false);
  }, [authUser]);

  useEffect(() => {
    getUserData();
  }, [authUser, getUserData]);

  useEffect(() => {
    let _data = window.localStorage.getItem('userData');
    let _mobile = window.localStorage.getItem('mobileNumber');
    if (_data && _mobile) {
      let data = JSON.parse(_data);
      data.mobileNumber = _mobile;

      setUser(data);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center space-y-4">
          <CircularProgress isIndeterminate color="blue.400" />
          <h1>Loading please wait!</h1>
        </div>
      ) : (
        <userContext.Provider value={{ user, setUser }}>
          {children}
        </userContext.Provider>
      )}
    </>
  );
}
