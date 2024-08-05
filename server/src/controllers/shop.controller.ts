import { Request, Response } from "express"
import { Cars } from "../models/cars.model"

export const getAllCars = async(req:Request, res:Response) => {

    try {

        const query = constructSearchQuery(req.query)
        const pageSize = 5
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1')
        const skip = (pageNumber - 1) * pageSize;
        const car = await Cars.find(query).skip(skip).limit(pageSize).exec()

        const total = await Cars.countDocuments().exec()

        const response = {
            data: car,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };
    
        res.status(200).json(response)

    }catch (err){
        res.status(500).json({message: "Error fetching cars", error: err})
    }
}

export const getLatestCars = async(req:Request, res:Response) => {
    
    try {
        const car = await Cars.find().sort({createdAt: -1}).limit(3)

        if (car.length === 0) {
            return res.status(404).json({ msg: 'No cars found in the database' });
          }

        res.status(200).json(car)

    }catch (err){
        res.status(500).json({message: "Error fetching cars", error: err})
    }
}



export const getSearch = async(req:Request, res:Response) => {

    try {

        const damn = req.query.model
        const query = constructSearchQuery(req.query);
        const pageSize = 3;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1');
        const skip = (pageNumber - 1) * pageSize;
        const car = await Cars.find(query).limit(pageSize).exec()

        const total = await Cars.countDocuments().exec()

        const response = {
            data: car,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.status(200).json(response)

    }catch (err){
        res.status(500).json({message: "Error fetching cars", error: err})
    }
}


export const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};

    if (queryParams.model) {
        constructedQuery.model = new RegExp(queryParams.model, 'i');
        console.log("Constructed query:", constructedQuery);
    } 
    return constructedQuery
}