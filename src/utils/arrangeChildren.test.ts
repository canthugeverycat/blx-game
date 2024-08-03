import arrangeChildren from './arrangeChildren';

describe('arrangeChildren.ts', () => {
  const mockGetBoundingClientRect = jest.fn();
  const mockContainerRef = {
    current: {
      getBoundingClientRect: mockGetBoundingClientRect,
      firstElementChild: {
        children: [
          { getBoundingClientRect: jest.fn(() => ({ right: 50 })) },
          { getBoundingClientRect: jest.fn(() => ({ right: 150 })) },
          { getBoundingClientRect: jest.fn(() => ({ right: 250 })) },
          { getBoundingClientRect: jest.fn(() => ({ right: 350 })) },
        ],
      },
    },
  } as unknown as React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    mockGetBoundingClientRect.mockReturnValue({
      left: 0,
      right: 400,
      width: 400,
    });
  });

  it('reorders items initially', () => {
    const positions = arrangeChildren({
      length: 4,
      itemSize: 100,
      focusedIndex: 1,
      containerWidth: 400,
      positions: [0, 1, 2, 3],
      containerRef: mockContainerRef,
    });

    expect(positions).toEqual([1, 1, 2, 0]);
  });

  it('moves items overflowing to the left', () => {
    mockContainerRef.current!.firstElementChild!.children[0].getBoundingClientRect =
      jest.fn().mockReturnValue({ right: -10 });
    mockContainerRef.current!.firstElementChild!.children[1].getBoundingClientRect =
      jest.fn().mockReturnValue({ right: 50 });

    const positions = arrangeChildren({
      length: 4,
      itemSize: 100,
      focusedIndex: 1,
      containerWidth: 400,
      positions: [0, 1, 2, 3],
      containerRef: mockContainerRef,
    });

    expect(positions).toEqual([1, 1, 2, 0]);
  });

  it('brings items back into view when resized', () => {
    mockGetBoundingClientRect
      .mockReturnValueOnce({ left: 0, right: 200, width: 200 })
      .mockReturnValueOnce({ left: 0, right: 400, width: 400 });

    const positions = arrangeChildren({
      length: 4,
      itemSize: 100,
      focusedIndex: 2,
      containerWidth: 400,
      positions: [0, 1, 2, 3],
      containerRef: mockContainerRef,
    });

    expect(positions).toEqual([2, 2, 2, 3]);
  });
});
