import mongoose from "mongoose";

export type ReportType = {
    _id: mongoose.Schema.Types.ObjectId;
    userId: string;
    detail: string;
    submitAt: Date
    resolved: number;
    resolvedAt: Date;
    resolvedBy: string;
    resolvedDetail: string;
}

const Report = new mongoose.Schema<ReportType>({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    userId: {type: String, required: true},
    detail: {type: String, required: true},
    submitAt: {type: Date, required: true, default: new Date()},
    resolved: {type: Number, default: 0},
    resolvedAt: {type: Date, default: 0},
    resolvedBy: {type: String, default: '-'},
    resolvedDetail: {type: String, default: '-'}
})

export const ReportModel = mongoose.model<ReportType>('Report', Report)