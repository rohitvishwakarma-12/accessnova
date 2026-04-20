import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/globals.css';
import '../public/css/style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}
