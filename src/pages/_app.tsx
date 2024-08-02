import { AppProps } from 'next/app';
import React from 'react';

import '@/globals/root.scss';
import '@/globals/reset.scss';

import { SpinProvider } from '@/utils/SpinContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SpinProvider>
      <Component {...pageProps} />
    </SpinProvider>
  );
};

export default MyApp;
