import React from "react";

type SearchContext = {
    model: string;
    saveSearchValues: (
        model: string
    ) =>void
}
const SearchContext = React.createContext<SearchContext | undefined>(undefined)


export const SearchProvider = ({children}: {children: React.ReactNode}) => {

    const [model, setModel] = React.useState<string>("")

    const saveSearchValues =
    (model: string) => {

        setModel(model)

    }

    return (
        <SearchContext.Provider value={{model, saveSearchValues}}>
            {children}
        </SearchContext.Provider>
    )


}


export const useSearchContext = () => {

    const context = React.useContext(SearchContext)

    if (context === undefined) {
        throw new Error("useSearchContext must be used within a SearchProvider")
    }

    return context
}