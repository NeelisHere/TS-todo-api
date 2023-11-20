import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../middlewares/error.js";
import UserModel from "../models/userModel.js";
import { sendCookie } from "../utils/utils.js";

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        // console.log(`${req.url} route hit`)
        try {
            const { username, email, password } = req.body
            let user = await UserModel.findOne({ username, email})
            if (user) {
                return next(new ErrorHandler('User already registered.', 401))
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            user = await UserModel.create({ username, email, password: hashedPassword })
            sendCookie(user, res, 'User registration successful!', 201)
        } catch (error) {
            console.error(error);
            return next(new ErrorHandler())
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body
            const user = await UserModel.findOne({ username }).select('+password')
            if (!user) {
                return next(new ErrorHandler('User not found', 404))
            }
            const isMatch = bcrypt.compare(password, user.password)
            if (!isMatch) {
                return next(new ErrorHandler('Password mismatch', 401))
            }
            sendCookie(user, res, `login successful! Welcome back ${username}`, 200)
        } catch (err) {
            console.log(err);
            return next(new ErrorHandler())
        }
    }
    async logout(req: Request, res: Response) {
        res.status(200)
        .cookie('token', '', {
            expires: new Date(Date.now()),
            sameSite: 'none',
            secure: true
        })
        .json({
            success: true,
            message: 'User have been logged out successfully'
        })
    }
}

export default new AuthController();