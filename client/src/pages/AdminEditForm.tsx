import { useParams } from "react-router-dom"
import ManageCarsForm  from "../forms/CarsForm/ManageCarsFrom"
import { useMutation, useQuery } from "react-query"
import * as apiClient from '../api-client'

const AdminEditCar = () => {

    const {carId} = useParams()

    const {data: car} = useQuery("fetchMyCarById", () => (apiClient.fetchCarById(carId || '')), {
        onError :() => {
            alert("Failed to fetch car")
        },
        enabled: !!carId
    })

    const {mutate, isLoading} = useMutation(apiClient.admEditCar, {
        onSuccess : () => {},
        onError : () => {}
    })

    const handleSubmit = (carFormData: FormData) => {
        mutate(carFormData)
    }

    return (
    <ManageCarsForm onSave={handleSubmit} isLoading={isLoading} car={car}/>
    )
}

export default AdminEditCar