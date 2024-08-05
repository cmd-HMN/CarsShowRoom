import { createContext, useState, useContext, ReactNode } from 'react';


type LoadingContext = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContext | undefined>(undefined)
export const LoadingProvider = ({children }: {children: ReactNode}) => {

    const [loading, setLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{loading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoadingContext = () => {
    const context = useContext(LoadingContext)
    if (context === undefined) {
        throw new Error('useLoadingContext must be used within a LoadingProvider')
    }
    return context
}