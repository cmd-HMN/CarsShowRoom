import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext"

const UserLog = () => {
    const {isLoggedIn} = useAppContext();

    return (isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />)
}

export default UserLog