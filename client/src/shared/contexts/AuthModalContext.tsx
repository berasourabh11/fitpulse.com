// MyContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface openModal {
  authModalState: boolean; 
  openAuthModal: () => void;
  closeAuthModal: () => void 
}


const AuthModalContext = createContext<openModal | undefined>(undefined);

export function AuthModalContextProvider({ children }: { children: ReactNode }) {
  const [authModalState, setAuthModalState] = useState<boolean>(false);
  function openAuthModal() {
    setAuthModalState(true);
  }
  function closeAuthModal() {
    setAuthModalState(false);
  }

  return (
    <AuthModalContext.Provider value={{ authModalState , openAuthModal , closeAuthModal }}>
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
