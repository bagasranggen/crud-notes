// import '../styles/globals.css'

import '../styles/scss/bootstrap.scss';
import '../styles/scss/main.scss';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
