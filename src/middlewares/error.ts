import { Request, Response } from "express";

class ErrorHandler extends Error {
    statusCode;
    constructor(message?: string, statusCode?: number) {
        super(message)
        this.statusCode = statusCode
    }
}

export const errorMiddleware = <T extends ErrorHandler>(err: T, req: Request, res: Response) => {
    err.message = err.message || 'Internal Server Error'
    err.statusCode = err.statusCode || 500
    return res.json({
        success: false,
        message: err.message
    })
}

export default ErrorHandler
