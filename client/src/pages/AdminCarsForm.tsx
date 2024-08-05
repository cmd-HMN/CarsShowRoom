import { useMutation } from "react-query";
import ManageCarsForm from "../forms/CarsForm/ManageCarsFrom";
import { useNavigate } from "react-router-dom";
import * as apiClient from '../api-client'
import { useAppContext } from "../context/AppContext";

const AdminCarsForm = () => {
    
    const navigate = useNavigate()
    const {showToast} = useAppContext();
    const {mutate,isLoading} = useMutation(apiClient.admCarsForm, {
        onSuccess : () => {
            showToast({
                message: "Car added successfully",
                type: "SUCCESS"
            })
            navigate('/admin/profile')
        }
    })

    const handleSubmit = (data: FormData) =>{
        mutate(data)
    }
    return (
        <ManageCarsForm onSave={handleSubmit} isLoading={isLoading}/> 
    )
}

export default AdminCarsForm