import express from 'express'
import taskController from '../controllers/taskController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

const taskRouter = express.Router()

taskRouter.get('/all', isAuthenticated, taskController.getTasks)
taskRouter.post('/add', isAuthenticated, taskController.addTask)
taskRouter.route('/:taskId').get(taskController.getTaskById)
taskRouter.route('/edit/:taskId').put(taskController.editTask)
taskRouter.route('/delete/:taskId').delete(taskController.deleteTask)

export default taskRouter