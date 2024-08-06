import mongoose from "mongoose"

export type CarsType = {
    _id: string;
    model: string;
    company: string;
    price: number;
    imageUrls: string[];
    createdAt: Date;
    updatedAt: Date;
    description: string;
    category: string[];
    rating: number;
    sold: number;
    like: number;
    available:boolean;
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

const CarsSchema = new mongoose.Schema<CarsType>({
    model: {type: String, unique: true},
    company: {type: String, required: true},
    price: {type: Number, required: true},
    imageUrls: {type: [String], default: ['https://res.cloudinary.com/dfpvs69tj/image/upload/v1721793374/kajetan-daroch-eEXqa4OPlm4-unsplash-removebg-preview_pdl4cc.png']},
    description: {type: String, default: '-'},
    category: {type: [String], required: true},
    rating: {type: Number, default: 0},
    sold: {type: Number, default: 0},
    like: {type: Number, default: 0},
    available: {type: Boolean, default: true},
    width: {type: String, default: '-'},
    height: {type: String, default: '-'},
    length: {type: String, default: '-'},
    wheelBase: {type: String, default: '-'},
    groundClearance: {type: String, default: '-'},
    kerbWeight: {type: String, default: '-'},
    bootSpace: {type: String, default: '-'},
    seatingCapacity: {type: String, default: '-'},
    door: {type: String, default: '-'},
    engineType: {type: String, default: '-'},
    cylinders: {type: String, default: '-'},
    displacement: {type: String, default: '-'},
    horsePower: {type: String, default: '-'},
    torque: {type: String, default: '-'},
    fuelSystem: {type: String, default: '-'},
    turboCharger: {type: String, default: '-'},
    cylinderConfiguration: {type: String, default: '-'},
    valvesPerCylinder: {type: String, default: '-'},
    valueMechanism: {type: String, default: '-'},
    compressionRatio: {type: String, default: '-'},
    driveTrain: {type: String, default: '-'},
    maxSpeed: {type: String, default: '-'},
    transmissionType: {type: String, default: '-'},
    gearBox: {type: String, default: '-'},
    steeringType: {type: String, default: '-'},
    minimumTurningRadius: {type: String, default: '-'},
    powerAssisted: {type: String, default: '-'},
    frontSuspension: {type: String, default: '-'},
    rearSuspension: {type: String, default: '-'},
    frontBrake: {type: String, default: '-'},
    rearBrake: {type: String, default: '-'},
    tyreSize: {type: String, default: '-'},
    wheelType: {type: String, default: '-'},
    wheelSize: {type: String, default: '-'},
    pcd: {type: String, default: '-'},
    spareTyreSize: {type: String, default: '-'},
    mileageCity: {type: String, default: '-'},
    mileageHighway: {type: String, default: '-'},
    fuelTankCapacity: {type: String, default: '-'},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()}
})

export const Cars = mongoose.model<CarsType>('Cars', CarsSchema)