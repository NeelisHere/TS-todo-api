import { NextFunction, Request, Response } from "express";
import TaskModel from "../models/taskModel.js";
import ErrorHandler from "../middlewares/error.js";

class TaskController {
    async addTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { title } = req.body
            const task = await TaskModel.create({ title, creator: req.user })
            res.status(200).json({
                success: true,
                task,
                message: 'Task created successfully'
            })
        } catch (error) {
            return next(new ErrorHandler())
        }
    }
    async editTask(req: Request, res: Response, next: NextFunction) {
        const { title, isCompleted } = req.body
        const { taskId } = req.params
        // console.log(req.body, req.url)
        try {
            const task = await TaskModel.findByIdAndUpdate(taskId, { title, isCompleted })
            res.status(200).json({ success: true, task })
        } catch (error) {
            next(new ErrorHandler())
        }
    }
    async deleteTask(req: Request, res: Response, next: NextFunction) {
        const { taskId } = req.params
        try {
            await TaskModel.findByIdAndDelete(taskId)
            res.status(200).json({ success: true, message: 'Task deleted successfully!' })
        } catch (error) {
            next(new ErrorHandler())
        }
    }
    async getTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await TaskModel.find({ creator: req.user?._id }).populate('creator')
            res.status(200).json({ success: true, tasks })
        } catch (error) {
            return next(new ErrorHandler())
        }
    }
    async getTaskById(req: Request, res: Response) {

    }
}

export default new TaskController();