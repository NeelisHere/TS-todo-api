import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import UserModel from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";

class UserController {
    async getAllUsers(req: Request, res: Response) {
        res.json({
            success: true,
            users: []
        })
    }
    async getUser(req: Request, res: Response) {
        res.json({
            success: true,
            users: [ req.params.userId ]
        })
    }
    async getCurrentlyLoggedInUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies
            if (!token) {
                next(new ErrorHandler('User not logged in!', 400))
            }
            const jwt_secret = process.env.JWT_SECRET || 'secret-key'
            const { _id }: jwt.JwtPayload = jwt.verify(token, jwt_secret) as jwt.JwtPayload
            const user = await UserModel.findById(_id)
            res.status(200).json({ success: true, user })
        } catch (error) {
            next(new ErrorHandler())
        }
    }
}

export default new UserController();