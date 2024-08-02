import React, { createContext, useContext, useState } from 'react';

import isPrime from './isPrime';

interface SpinContextType {
  spinAll: () => void;
  onSpinStart: () => void;
  onSpinEnd: (result: number) => void;
  isSpinning: boolean;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  winnings: number;
}

const SpinContext = createContext<SpinContextType | null>(null);

export const useSpinContext = () => {
  const context = useContext(SpinContext);

  if (!context) {
    throw new Error('useSpinContext can not be used outside SpinProvider!');
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};
export const SpinProvider = ({ children }: Props) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeSpinners, setActiveSpinners] = useState(0);
  const [count, setCount] = useState(1);
  const [winnings, setWinnings] = useState(0);

  const spinAll = () => {
    setIsSpinning(true);
  };

  const onSpinStart = () => {
    setActiveSpinners((prev) => prev + 1);
  };

  const onSpinEnd = (result: number) => {
    const newActiveSpinners = activeSpinners - 1;

    if (!newActiveSpinners) {
      setIsSpinning(false);
    }

    setActiveSpinners(newActiveSpinners);

    if (isPrime(result)) {
      setWinnings((prev) => prev + result);
    }
  };

  return (
    <SpinContext.Provider
      value={{
        spinAll,
        onSpinEnd,
        onSpinStart,
        isSpinning,
        count,
        setCount,
        winnings,
      }}
    >
      {children}
    </SpinContext.Provider>
  );
};
