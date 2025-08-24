'use client'
import React, { createContext, ReactNode, useState } from 'react';

interface ContextType {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
}

const ContextData = createContext<ContextType | null>(null);
interface Children {
    children: ReactNode;
}

const DataProvider: React.FC<Children> = ({ children }) => {
    const [toggle, setToggle] = useState<boolean>(true);
    return (
        <ContextData.Provider value={{
            toggle,
            setToggle,
        }}>
            {children}
        </ContextData.Provider>
    );
};

export { ContextData, DataProvider };