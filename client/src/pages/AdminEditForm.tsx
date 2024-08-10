import { useNavigate, useParams } from "react-router-dom"
import ManageCarsForm  from "../forms/CarsForm/ManageCarsFrom"
import { useMutation, useQuery, useQueryClient } from "react-query"
import * as apiClient from '../api-client'
import { useAppContext } from "../context/AppContext"
import { useLoadingContext } from "../context/LoadingContext"
import { useEffect } from "react"

const AdminEditCar = () => {

    const {carId} = useParams()
    const navigate = useNavigate()
    const {showToast} = useAppContext()
    const queryClient = useQueryClient()
    const {setLoading} = useLoadingContext()

    const {data: car, isLoading: fetchCarLoading} = useQuery(["fetchMyCarById", carId], () => (apiClient.fetchCarById(carId || '')), {
        onError :() => {
            alert("Failed to fetch car")
        },
        enabled: !!carId,
    })

    const {mutate, isLoading} = useMutation(apiClient.admEditCar, {
        onSuccess : () => {
            showToast({
                message: "Car edited successfully",
                type: "SUCCESS",
            })
            queryClient.invalidateQueries("fetchMyCarById")
            navigate('/admin/cars')
        },
        onError : () => {
            showToast({
                message: "Failed to edit car",
                type: "ERROR",
            })  
        }
    })

    const handleSubmit = (carFormData: FormData) => {
        carFormData.set("carId", carId || '')
        mutate(carFormData)
    }

    useEffect(() => {
        setLoading(fetchCarLoading)
    } ,
    [fetchCarLoading, setLoading]
)
    return (    
        <ManageCarsForm onSave={handleSubmit} isLoading={isLoading} car={car} edit={true}/>
    )
}

export default AdminEditCar