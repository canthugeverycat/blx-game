import React, { createContext, useContext, useState } from 'react';

import { SOUNDS } from '@/globals/const';
import isPrime from '@/utils/isPrime';
import { playSoundEffect } from '@/utils/playSoundEffect';

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

  const [count, setCount] = useState(1); // Number of reels
  const [activeSpinners, setActiveSpinners] = useState(0); // Number of reels currently spinning

  const [winnings, setWinnings] = useState(0);

  /**
   * Starts the spinning of all reels
   */
  const spinAll = () => {
    playSoundEffect(SOUNDS.INSERT_COIN);
    setIsSpinning(true);
  };

  /**
   * Handler that gets called on spin of every reel
   */
  const onSpinStart = () => {
    setActiveSpinners((prev) => prev + 1);
  };

  /**
   * Handlers that gets called on end of every reel spin
   */
  const onSpinEnd = (result: number) => {
    const newActiveSpinners = activeSpinners - 1;

    if (!newActiveSpinners) {
      setIsSpinning(false);
    }

    setActiveSpinners(newActiveSpinners);

    if (isPrime(result)) {
      playSoundEffect(SOUNDS.WIN);

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
