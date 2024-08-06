import { query, Request, Response } from "express"
import { Cars } from "../models/cars.model"

export const shopSearch = async(req:Request, res:Response) => {

    try {
        const query = constructSearchQuery(req.query)
        let sort: any = req.query.sort
        switch (sort)
        {
            case "priceAsc":
                sort = {price: 1}
                break;
            case "priceDsc":
                sort = {price: -1}
                break;
            case "rating": 
                sort = {rating: 1}
                break;
            default:
                sort = {createdAt: -1}
                break;
        }
        const pageSize = parseInt(req.query.pageSize ? req.query.pageSize.toString() : '3')
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1')
        const skip = (pageNumber - 1) * pageSize;
        const car = await Cars.find(query).skip(skip).limit(pageSize).sort(sort).exec()

        const total = await Cars.countDocuments(query).exec()

        const response = {
            data: car,
            pagination: {
                total: total,
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

export const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};

    if (queryParams.model) {
        constructedQuery.model = new RegExp(queryParams.model, 'i');
    } 

    if(queryParams.company){
        constructedQuery.company = new RegExp(queryParams.company, 'i')
    }

    if(queryParams.category){
        constructedQuery.category = {
            $in: Array.isArray(queryParams.category) ? queryParams.category : [queryParams.category]
        }
    }
    if(queryParams.maxPrice){
        constructedQuery.price = {$lte: parseInt(queryParams.maxPrice)}
    }

    if(queryParams.minPrice){
        constructedQuery.price = {$gte: parseInt(queryParams.minPrice)}
    }

    return constructedQuery
}