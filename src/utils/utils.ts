import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { Document } from 'mongoose'
import UserDTOS from '../dtos/user-dtos.js'

interface UserInterface {
    username: string,
    email: string,
    password: string
}

export interface UserDocType extends UserInterface, Document {}

type SendCookieType = (
    user: UserDocType,
    res: Response,
    message: string,
    statusCode?: number|undefined
) => void 

export const sendCookie: SendCookieType = (user, res, message, statusCode=200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secret-key')
    res.status(statusCode)
        .cookie('token', token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: 'none',
            secure: true
        })
        .json({ 
            success: true, 
            message, 
            user: new UserDTOS(user) 
        })
}