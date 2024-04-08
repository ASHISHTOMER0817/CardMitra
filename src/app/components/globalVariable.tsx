'use client'
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface GlobalState {
      reload: boolean;
      setReload: React.Dispatch<React.SetStateAction<boolean>>;
    }
    
    // Create a new context for managing global state
  export const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

// Create a provider component to manage the global state
export const GlobalStateProvider = ({ children }:{children:ReactNode}) => {
  const [reload, setReload] = useState(true);

  return (
    <GlobalStateContext.Provider value={ {reload, setReload} }>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => {
      const context = useContext(GlobalStateContext);
    
      if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
      }
    
      return context;
    };
