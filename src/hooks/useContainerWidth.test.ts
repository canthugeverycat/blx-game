import { act, renderHook } from '@testing-library/react';

import { useContainerWidth } from './useContainerWidth';

describe('useContainerWidth', () => {
  it('returns container width', () => {
    const mockRef = {
      current: { clientWidth: 500 },
    } as React.RefObject<HTMLDivElement>;

    const { result } = renderHook(() => useContainerWidth(mockRef));

    expect(result.current.containerWidth).toBe(500);
  });

  it('updates width on resize', () => {
    const mockRef = {
      current: { clientWidth: 500 },
    } as React.RefObject<HTMLDivElement>;

    const { result, rerender } = renderHook(() => useContainerWidth(mockRef));

    Object.defineProperty(mockRef.current, 'clientWidth', {
      value: 600,
      writable: true,
    });

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    rerender();

    expect(result.current.containerWidth).toBe(600);
  });

  it('removes listener on unmount', () => {
    const mockRef = {
      current: { clientWidth: 500 },
    } as React.RefObject<HTMLDivElement>;
    const { unmount } = renderHook(() => useContainerWidth(mockRef));

    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );
  });
});
