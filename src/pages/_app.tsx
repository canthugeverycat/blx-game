import { AppProps } from 'next/app';
import React from 'react';

import { SpinProvider } from '@/utils/SpinContext';

import '@/styles/root.scss';
import '@/styles/reset.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SpinProvider>
      <Component {...pageProps} />
    </SpinProvider>
  );
};

export default MyApp;
