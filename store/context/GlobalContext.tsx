import React, { createContext, useContext, useState } from 'react';

export type GlobalState = {
    layout: boolean;
    setLayout: (layout: boolean) => void;
}

export const GlobalStateContext = createContext<GlobalState>({
    layout: false,
    setLayout: () => {
    },
});

export const GlobalStateContextProvider = ({ children }: any) => {
    const [ layout, setLayout ] = useState(false);

    const defaultContext = { layout, setLayout };

    return (
        <GlobalStateContext.Provider value={defaultContext}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalStateContext = () => useContext(GlobalStateContext);