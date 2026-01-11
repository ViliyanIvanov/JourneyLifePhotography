'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type GlobalLoadingContextValue = {
  isGlobalLoading: boolean;
  setGlobalLoading: (isLoading: boolean) => void;
};

const GlobalLoadingContext = createContext<GlobalLoadingContextValue | null>(
  null
);

export function GlobalLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const setGlobalLoading = useCallback((isLoading: boolean) => {
    setIsGlobalLoading(isLoading);
  }, []);

  const value = useMemo(
    () => ({ isGlobalLoading, setGlobalLoading }),
    [isGlobalLoading, setGlobalLoading]
  );

  return (
    <GlobalLoadingContext.Provider value={value}>
      {children}
    </GlobalLoadingContext.Provider>
  );
}

export function useGlobalLoading() {
  const context = useContext(GlobalLoadingContext);

  if (!context) {
    throw new Error(
      'useGlobalLoading must be used within a GlobalLoadingProvider'
    );
  }

  return context;
}
