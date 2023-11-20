import { UserDocType } from "../utils/utils.js";
import { Document } from 'mongoose'

interface TaskInterface {
    title: string,
    isCompleted: boolean,
    creator: UserDocType
}

export interface TaskDocType extends TaskInterface, Document {}

class TaskDTOS {
    id: string; 
    title: string; 
    isCompleted: boolean;
    creator: UserDocType;
    constructor(task: TaskDocType) {
        const { _id, title, isCompleted, creator } = task
        this.id = _id;
        this.title = title;
        this.isCompleted = isCompleted;
        this.creator = creator;
    }
}

export default TaskDTOS 