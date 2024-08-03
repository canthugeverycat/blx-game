import { act, renderHook, waitFor } from '@testing-library/react';

import { useSpinnerAnimation } from './useSpinnerAnimation';

describe('useSpinnerAnimation', () => {
  it('returns initial focused index', () => {
    const { result } = renderHook(() =>
      useSpinnerAnimation({
        id: 1,
        items: [0, 1, 2, 3],
        target: 1,
        containerWidth: 400,
        itemSize: 100,
        preselectItem: 2,
        isSpinning: false,
      })
    );

    expect(result.current.focusedIndex).toBe(2);
  });

  it('calculates offset correctly', () => {
    const { result } = renderHook(() =>
      useSpinnerAnimation({
        id: 1,
        items: [0, 1, 2, 3],
        target: 2,
        containerWidth: 400,
        itemSize: 100,
        preselectItem: 0,
        isSpinning: true,
      })
    );

    const expectedOffset = 100 * (2 + 1) - 100 / 2 - 400 / 2;
    expect(result.current.animationConfig.marginLeft.get()).toBe(
      `-${expectedOffset}px`
    );
  });

  it('updates focused index based on container animation', () => {
    const { result } = renderHook(() =>
      useSpinnerAnimation({
        id: 1,
        items: [0, 1, 2, 3],
        target: 1,
        containerWidth: 400,
        itemSize: 100,
        preselectItem: 0,
        isSpinning: true,
      })
    );

    act(() => {
      result.current.animationConfig.marginLeft.set('-150px');
    });

    waitFor(() => {
      expect(result.current.focusedIndex).toBe(1);
    });
  });
});
