import mongoose from "mongoose";

const schema = {
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}

const taskSchema = new mongoose.Schema(schema)
const TaskModel = mongoose.model('Task', taskSchema)
export default TaskModel