import React from "react"
import { useQuery } from "react-query"
import * as apiClient from '../api-client'

type AdminContext = {
    adminLogged: boolean,
}

const AdminContext = React.createContext<AdminContext | undefined>(undefined)

export const AdminContextProvider = ({children} : {children: React.ReactNode}) => {

    const {isError} = useQuery("admnValidateToken", apiClient.admValidateToken, {
        retry: false
    })

    return (
        <AdminContext.Provider
        value={{
            adminLogged: !isError
        }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => {
    const context = React.useContext(AdminContext)
    if (context === undefined) {
        throw new Error("useAdminContext must be used within a AdminProvider")
    }
    return context as AdminContext
} 