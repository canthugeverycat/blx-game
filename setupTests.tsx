import '@testing-library/jest-dom';

import React from 'react';

jest.mock('@/utils/playSoundEffect', () => ({
  playSoundEffect: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));
