import { log } from "console"
import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import UserModel from "../models/userModel.js"
import ErrorHandler from "./error.js"

const jwt_secret = process.env.JWT_SECRET || 'secret-key'

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    log('Authenticating users...')
    try {
        const { token } = req.cookies
        // console.log(token)
        if(!token){
            return next(new ErrorHandler('User not logged in!', 404))
        }
        const { _id }: jwt.JwtPayload = jwt.verify(token, jwt_secret) as jwt.JwtPayload
        const user = await UserModel.findOne({ _id })
        if (!user) {
            return next(new ErrorHandler('Invalid user credentials!', 404))
        } else {
            req.user = user
        }
        next()
    } catch (error) {
        return next(new ErrorHandler())
    }

}