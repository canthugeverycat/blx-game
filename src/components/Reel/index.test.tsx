import React from 'react';

import '@testing-library/jest-dom';

import Reel from '@/components/Reel';
import { useSpinContext } from '@/contexts/SpinContext';
import { useContainerWidth } from '@/hooks/useContainerWidth';
import { useSpinnerAnimation } from '@/hooks/useSpinnerAnimation';
import { useSpinnerPositions } from '@/hooks/useSpinnerPositions';
import { SpringValue } from '@react-spring/web';
import { render } from '@testing-library/react';

jest.mock('@/contexts/SpinContext');
jest.mock('@/hooks/useContainerWidth');
jest.mock('@/hooks/useSpinnerAnimation');
jest.mock('@/hooks/useSpinnerPositions');

const mockedUseSpinContext = useSpinContext as jest.MockedFunction<
  typeof useSpinContext
>;
const mockedUseContainerWidth = useContainerWidth as jest.MockedFunction<
  typeof useContainerWidth
>;
const mockedUseSpinnerAnimation = useSpinnerAnimation as jest.MockedFunction<
  typeof useSpinnerAnimation
>;
const mockedUseSpinnerPositions = useSpinnerPositions as jest.MockedFunction<
  typeof useSpinnerPositions
>;

describe('Reel', () => {
  const mockUseSpinContext = {
    isSpinning: false,
    count: 2,
    setCount: jest.fn(),
    spinAll: jest.fn(),
    onSpinStart: jest.fn(),
    onSpinEnd: jest.fn(),
    winnings: 0,
  };

  const mockContainerWidth = {
    containerWidth: 500,
  };

  const mockSpinnerAnimation = {
    focusedIndex: 0,
    animationConfig: {
      marginLeft: new SpringValue('800px'),
    },
  };

  const mockSpinnerPositions = {
    positions: [0, 1, 2],
  };

  beforeEach(() => {
    mockedUseSpinContext.mockReturnValue(mockUseSpinContext);
    mockedUseContainerWidth.mockReturnValue(mockContainerWidth);
    mockedUseSpinnerAnimation.mockReturnValue(mockSpinnerAnimation);
    mockedUseSpinnerPositions.mockReturnValue(mockSpinnerPositions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate positions based on container width', () => {
    render(<Reel id={1} items={[1, 2, 3]} />);

    expect(mockedUseContainerWidth).toHaveBeenCalled();
    expect(mockedUseSpinnerPositions).toHaveBeenCalled();
  });
});
