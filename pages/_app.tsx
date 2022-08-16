import type { AppProps } from 'next/app';

import { store } from '../store/store';
import { Provider } from 'react-redux';
import { GlobalStateContextProvider } from '../store/context/GlobalContext';
import { NotesStateContextProvider } from '../store/context/NotesContext';

// import '../styles/globals.css'

import '@fontsource/poppins';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/800.css';

import '../styles/scss/bootstrap.scss';
import '../styles/scss/main.scss';

import MainLayout from '../components/layout/mainLayout/MainLayout';

// import '../styles/scss/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <GlobalStateContextProvider>
                <NotesStateContextProvider>
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                </NotesStateContextProvider>
            </GlobalStateContextProvider>
        </Provider>
    );
}

export default MyApp;
