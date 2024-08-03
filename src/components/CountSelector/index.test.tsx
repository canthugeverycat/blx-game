import React from 'react';

import '@testing-library/jest-dom';

import CountSelector from '@/components/CountSelector';
import { useSpinContext } from '@/contexts/SpinContext';
import { fireEvent, render } from '@testing-library/react';

jest.mock('@/contexts/SpinContext');

const mockedUseSpinContext = useSpinContext as jest.MockedFunction<
  typeof useSpinContext
>;

describe('CountSelector', () => {
  const mockSetCount = jest.fn();
  const mockUseSpinContext = {
    isSpinning: false,
    count: 2,
    setCount: mockSetCount,
    spinAll: jest.fn(),
    onSpinStart: jest.fn(),
    onSpinEnd: jest.fn(),
    winnings: 0,
  };

  beforeEach(() => {
    mockedUseSpinContext.mockReturnValue(mockUseSpinContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should decrease the count when the appropriate button is clicked', () => {
    const { getByText } = render(<CountSelector />);

    const button = getByText('-');
    fireEvent.click(button);

    const updateFn = mockSetCount.mock.calls[0][0];
    expect(updateFn(2)).toBe(1);
  });

  it('should not decrease the count below 1', () => {
    mockUseSpinContext.count = 1;

    const { getByText } = render(<CountSelector />);

    const button = getByText('-');
    fireEvent.click(button);

    const updateFn = mockSetCount.mock.calls[0][0];
    expect(updateFn(1)).toBe(1);
  });

  it('should increase the count when the increase button is clicked', () => {
    const { getByText } = render(<CountSelector />);

    const button = getByText('+');
    fireEvent.click(button);

    const updateFn = mockSetCount.mock.calls[0][0];
    expect(updateFn(2)).toBe(3);
  });

  it('should not increase the count above 4', () => {
    mockUseSpinContext.count = 4;

    const { getByText } = render(<CountSelector />);

    const button = getByText('+');
    fireEvent.click(button);

    const updateFn = mockSetCount.mock.calls[0][0];
    expect(updateFn(4)).toBe(4);
  });
});
