import React from 'react';

import isPrime from '@/utils/isPrime';
import { act, renderHook, waitFor } from '@testing-library/react';

import { SpinProvider, useSpinContext } from './SpinContext';

jest.mock('@/utils/isPrime', () => jest.fn());

describe('SpinContext', () => {
  it('increments active spinners when spin starts', () => {
    const { result } = renderHook(() => useSpinContext(), {
      wrapper: SpinProvider,
    });

    act(() => {
      result.current.onSpinStart();
    });

    waitFor(() => {
      expect(result.current.isSpinning).toBe(true);
    });
  });

  it('decrements active spinners when spin ends', () => {
    const { result } = renderHook(() => useSpinContext(), {
      wrapper: SpinProvider,
    });

    act(() => {
      result.current.onSpinStart();
      result.current.onSpinEnd(5);
    });

    waitFor(() => {
      expect(result.current.isSpinning).toBe(false);
    });
  });

  it('updates winnings for a prime number', () => {
    const { result } = renderHook(() => useSpinContext(), {
      wrapper: SpinProvider,
    });

    (isPrime as jest.Mock).mockReturnValueOnce(true);

    act(() => {
      result.current.onSpinEnd(5);
    });

    expect(result.current.winnings).toBe(5);
  });

  it('doesnt update winnings for a non-prime', () => {
    const { result } = renderHook(() => useSpinContext(), {
      wrapper: SpinProvider,
    });

    (isPrime as jest.Mock).mockReturnValueOnce(false);

    act(() => {
      result.current.onSpinEnd(4);
    });

    expect(result.current.winnings).toBe(0);
  });
});
