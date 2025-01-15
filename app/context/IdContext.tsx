import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define el tipo para el contexto
interface IdContextType {
    id: string;
    setId: (id: string) => void;
}

// Crea el contexto con un valor por defecto
const IdContext = createContext<IdContextType | undefined>(undefined);

// Crea el proveedor del contexto
export const IdProvider = ({ children }: { children: ReactNode }) => {
    const [id, setId] = useState<string>('');

    return (
        <IdContext.Provider value={{ id, setId }}>
            {children}
        </IdContext.Provider>
    );
};

// Hook para usar el contexto
export const useId = () => {
    const context = useContext(IdContext);
    if (context === undefined) {
        throw new Error('useId must be used within an IdProvider');
    }
    return context;
};

export default IdProvider;