import { AppProps } from 'next/app';
import React from 'react';

import '@/globals/root.scss';
import '@/globals/reset.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
