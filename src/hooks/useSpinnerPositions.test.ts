import arrangeChildren from '@/utils/arrangeChildren';
import { renderHook } from '@testing-library/react';

import { useSpinnerPositions } from './useSpinnerPositions';

jest.mock('@/utils/arrangeChildren', () => jest.fn());

describe('useSpinnerPositions', () => {
  it('returns initial positions', () => {
    const mockArrangeChildren = arrangeChildren as jest.Mock;
    mockArrangeChildren.mockReturnValue([0, 1, 2, 3]);

    const { result } = renderHook(() =>
      useSpinnerPositions({
        containerRef: { current: document.createElement('div') },
        containerWidth: 400,
        items: [0, 1, 2, 3],
        itemSize: 100,
        focusedIndex: 1,
      })
    );

    expect(result.current.positions).toEqual([0, 1, 2, 3]);
  });

  it('updates positions when another element comes to the middle', () => {
    const mockArrangeChildren = arrangeChildren as jest.Mock;
    mockArrangeChildren.mockReturnValueOnce([0, 1, 2, 3]);
    mockArrangeChildren.mockReturnValueOnce([1, 2, 3, 4]);

    const { result, rerender } = renderHook(
      ({ focusedIndex }) =>
        useSpinnerPositions({
          containerRef: { current: document.createElement('div') },
          containerWidth: 400,
          items: [0, 1, 2, 3],
          itemSize: 100,
          focusedIndex,
        }),
      { initialProps: { focusedIndex: 1 } }
    );

    expect(result.current.positions).toEqual([0, 1, 2, 3]);

    rerender({ focusedIndex: 2 });
    expect(result.current.positions).toEqual([1, 2, 3, 4]);
  });

  it('updates positions when containerWidth changes (resize)', () => {
    const mockArrangeChildren = arrangeChildren as jest.Mock;
    mockArrangeChildren.mockReturnValueOnce([0, 1, 2, 3]);
    mockArrangeChildren.mockReturnValueOnce([0, 2, 4, 6]);

    const { result, rerender } = renderHook(
      ({ containerWidth }) =>
        useSpinnerPositions({
          containerRef: { current: document.createElement('div') },
          containerWidth,
          items: [0, 1, 2, 3],
          itemSize: 100,
          focusedIndex: 1,
        }),
      { initialProps: { containerWidth: 400 } }
    );

    expect(result.current.positions).toEqual([0, 1, 2, 3]);

    rerender({ containerWidth: 600 });
    expect(result.current.positions).toEqual([0, 2, 4, 6]);
  });
});
