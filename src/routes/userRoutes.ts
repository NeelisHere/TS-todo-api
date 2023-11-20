import express from 'express'
import userController from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.route('/').get(userController.getCurrentlyLoggedInUser)
userRouter.route('/all').get(userController.getAllUsers)
userRouter.route('/:userId').get(userController.getUser)

export default userRouter