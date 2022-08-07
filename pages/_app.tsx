import { store } from '../store/store'
import { Provider } from 'react-redux';

// import '../styles/globals.css'

import '../styles/scss/bootstrap.scss';
import '../styles/scss/main.scss';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
}

export default MyApp;
