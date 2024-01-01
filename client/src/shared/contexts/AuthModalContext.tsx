// MyContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { userDetails } from "../../shared/types"


interface openModal {
  authModalState: boolean; 
  openAuthModal: () => void;
  closeAuthModal: () => void;
  userDetails: userDetails | null;
  set_user_details : (userDetails: userDetails) => void;
  unset_user_details : () => void;
}



const AuthModalContext = createContext<openModal | undefined>(undefined);

export function AuthModalContextProvider({ children }: { children: ReactNode }) {
  const [authModalState, setAuthModalState] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<userDetails | null>(null);
  function openAuthModal() {
    setAuthModalState(true);
  }
  function closeAuthModal() {
    setAuthModalState(false);
  }

  function set_user_details(userdetails: userDetails) {
    setUserDetails(userdetails);
  }

  function unset_user_details() {
    setUserDetails(null);
  }

  return (
    <AuthModalContext.Provider value={{ authModalState , openAuthModal , closeAuthModal,userDetails , set_user_details , unset_user_details}}>
      {children}
    </AuthModalContext.Provider>
  );
}

// Custom hook for using the context
export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('AuthModalContext must be used within a MyContextProvider');
  }
  return context;
}


