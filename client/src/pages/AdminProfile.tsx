import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const AdminProfile = () => {

    const navigate = useNavigate()

    return (
        <div>
            Admin Profile
            <Button onClick={() => {navigate('/admin/contributions')}}>
                Contribution
            </Button>
        </div>
    )
}

export default AdminProfile