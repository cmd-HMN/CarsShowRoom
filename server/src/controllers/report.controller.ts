import { Request, Response } from "express";
import { ReportModel } from "../models/report.model";

export const sendReport = async(req: Request, res:Response) => {

    try{    

        const report = new ReportModel(req.body)

        await report.save()

        res.status(200).json({
            message: "Report sent successfully"
        })

    }catch(e) {

        res.status(500).json({
            message: e
        })
    }
}

export const getAllReport = async(req:Request ,res:Response) => {

    try{

        let sort: any = req.query.sort as string
        switch (sort)
        {
            case "resolved":
                sort = {resolved: -1}
                break;
            case "unresolved":
                sort = {resolved: 1}
                break;
            default:
                sort = {submitAt: -1}
                break;
        }
        const pageSize = parseInt(req.query.pageSize ? req.query.pageSize.toString() : '3')
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1')
        const skip = (pageNumber - 1) * pageSize;
        const total = await ReportModel.countDocuments().exec()
        const report = await ReportModel.find().skip(skip).limit(pageSize).sort(sort)
        const response = {
            data: report,
            pagination: {
                total: total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        }

        res.status(200).json(response)

    }catch(e) {

        res.status(500).json({
            message: e
        })
    }
}