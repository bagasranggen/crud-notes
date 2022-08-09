import type { AppProps } from 'next/app';

import { store } from '../store/store';
import { Provider } from 'react-redux';
import { NotesStateContextProvider } from '../store/context/NotesContext';

// import '../styles/globals.css'

import '@fontsource/poppins'; // Defaults to weight 400.
import '@fontsource/poppins/600.css'; // Defaults to weight 400.
import '@fontsource/poppins/800.css'; // Defaults to weight 400.

import '../styles/scss/bootstrap.scss';
import '../styles/scss/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <NotesStateContextProvider>
                <Component {...pageProps} />
            </NotesStateContextProvider>
        </Provider>
    );
}

export default MyApp;
