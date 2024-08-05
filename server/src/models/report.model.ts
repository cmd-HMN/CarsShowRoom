import mongoose from "mongoose";

export type ReportType = {
    userId: string;
    detail: string;
    submitAt: Date
    resolved: boolean;
    resolvedAt: Date;
    resolvedBy: string;
    resolvedDetail: string;
}

const Report = new mongoose.Schema<ReportType>({
    userId: {type: String, required: true},
    detail: {type: String, required: true},
    submitAt: {type: Date, required: true, default: new Date()},
    resolved: {type: Boolean, default: false},
    resolvedAt: {type: Date, default: 0},
    resolvedBy: {type: String, default: '-'},
    resolvedDetail: {type: String, default: '-'}
})

export const ReportModel = mongoose.model<ReportType>('Report', Report)