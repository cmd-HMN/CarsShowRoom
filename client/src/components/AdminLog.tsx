import { Navigate, Outlet } from "react-router-dom"
import { useAdminContext } from "../context/AdminContext"

const AdminLog = () => {
    const {adminLogged} = useAdminContext() 

    return (adminLogged ? <Outlet /> : <Navigate to={"/admin/sign-in"} />)
}

export default AdminLog