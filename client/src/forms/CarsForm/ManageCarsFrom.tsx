import { FormProvider, useForm } from "react-hook-form"
import Specification from "./Specification";
import Details from "./Details";
import { useEffect } from "react";

export type CarType = {
    _id: string;
    model: string;
    price: number;
    company: string;
    imageFiles: FileList;
    imageUrls:string[];
    createdAt: Date;
    updatedAt: Date;
    description: string;
    category: string[];
    rating: number;
    sold: number;
    like: number;
    available: boolean;
    width: string;
    height: string;
    length: string;
    wheelBase: string;
    groundClearance: string;
    kerbWeight: string;
    bootSpace: string;
    seatingCapacity: string;
    door: string;
    engineType: string;
    cylinders: string;
    displacement: string;
    horsePower: string;
    torque: string;
    fuelSystem: string;
    turboCharger: string;
    cylinderConfiguration: string;
    valvesPerCylinder: string;
    valueMechanism: string;
    compressionRatio: string;
    driveTrain: string;
    maxSpeed: string;
    transmissionType: string;
    gearBox: string;
    steeringType: string;
    minimumTurningRadius: string;
    powerAssisted: string;
    frontSuspension: string;
    rearSuspension: string;
    frontBrake: string;
    rearBrake: string;
    tyreSize: string;
    wheelType: string;
    wheelSize: string;
    pcd: string;
    spareTyreSize: string;
    mileageCity: string;
    mileageHighway: string;
    fuelTankCapacity: string;
}

type Props = {
    car?: CarType
    onSave : (hotelFormData: FormData) => void
    isLoading : boolean
}

const ManageCarsForm = ({onSave ,isLoading, car}: Props) => {
    
    const formMethod = useForm<CarType>()

    const {handleSubmit, reset} = formMethod

    useEffect(()=> {
        reset(car)
    }, [reset, car])

    const onsubmit = handleSubmit((data: CarType) => {
        const formData = new FormData();

        formData.append("model", data.model)
        formData.append("price", data.price.toString())
        formData.append("description", data.description)
        formData.append("company", data.company)        

        Array.from(data.category).forEach((category, index) => {
            formData.append(`category[${index}]`, category)
        })
        Array.from(data.imageFiles).forEach((imageFile) => {
            formData.append("imageFiles", imageFile)
        })
        
        formData.append("width", data.width)
        formData.append("height", data.height)
        formData.append("length", data.length)
        formData.append("wheelBase", data.wheelBase)
        formData.append("groundClearance", data.groundClearance)
        formData.append("kerbWeight", data.kerbWeight)
        formData.append("bootSpace", data.bootSpace)
        formData.append("seatingCapacity", data.seatingCapacity)
        formData.append("door", data.door)
        formData.append("engineType", data.engineType)
        formData.append("cylinders", data.cylinders)
        formData.append("displacement", data.displacement)
        formData.append("horsePower", data.horsePower)
        formData.append("torque", data.torque)
        formData.append("fuelSystem", data.fuelSystem)
        formData.append("turboCharger", data.turboCharger)
        formData.append("cylinderConfiguration", data.cylinderConfiguration)
        formData.append("valvesPerCylinder", data.valvesPerCylinder)
        formData.append("valueMechanism", data.valueMechanism)
        formData.append("compressionRatio", data.compressionRatio)
        formData.append("driveTrain", data.driveTrain)
        formData.append("maxSpeed", data.maxSpeed)
        formData.append("transmissionType", data.transmissionType)
        formData.append("gearBox", data.gearBox)
        formData.append("steeringType", data.steeringType)
        formData.append("minimumTurningRadius", data.minimumTurningRadius)
        formData.append("powerAssisted", data.powerAssisted)
        formData.append("frontSuspension", data.frontSuspension)
        formData.append("rearSuspension", data.rearSuspension)
        formData.append("frontBrake", data.frontBrake)
        formData.append("rearBrake", data.rearBrake)
        formData.append("tyreSize", data.tyreSize)
        formData.append("wheelType", data.wheelType)
        formData.append("wheelSize", data.wheelSize)
        formData.append("pcd", data.pcd)
        formData.append("spareTyreSize", data.spareTyreSize)
        formData.append("mileageCity", data.mileageCity)
        formData.append("mileageHighway", data.mileageHighway)
        formData.append("fuelTankCapacity", data.fuelTankCapacity)

        onSave(formData)
        
    });
    

    return (    
        <FormProvider {...formMethod}>
            <form onSubmit={onsubmit} className="m-4">
                <Details />
                <Specification />
                <span className="flex justify-end">
                    <button 
                    disabled={isLoading}
                    type="submit" className="bg-black rounded text-white font-bold p-2 hover:bg-blue-500 text-xl disabled:bg-gray-500 m-4">
                        {isLoading ? "Saving" : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageCarsForm