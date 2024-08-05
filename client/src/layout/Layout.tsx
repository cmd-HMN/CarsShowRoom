import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
interface Props {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
    return (
        <div className="flex flex-col min-h-screen scroll-smooth">
            <Header />
            <main className="flex-grow pb-0 mb-0">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout