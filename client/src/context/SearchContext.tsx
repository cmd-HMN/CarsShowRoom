import React from "react";

type SearchContext = {
    model: string;
    company:string;
    saveSearchValues: (
        model: string,
        company:string,
    ) =>void
}
const SearchContext = React.createContext<SearchContext | undefined>(undefined)


export const SearchProvider = ({children}: {children: React.ReactNode}) => {

    const [model, setModel] = React.useState<string>(() => sessionStorage.getItem("model") || "")

    const [company, setCompany] = React.useState<string>(() => sessionStorage.getItem("company") || "")


    const saveSearchValues =
    (model: string, company: string) => {
        setModel(model) 
        setCompany(company)
        sessionStorage.setItem("model", model)
        sessionStorage.setItem("company", company)
    }

    return (
        <SearchContext.Provider value={{model, company, saveSearchValues}}>
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