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