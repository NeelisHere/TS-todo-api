import { Request } from 'express';
import { Document } from 'mongoose'; // Assuming you're using Mongoose

// Extend the Request type to include a user property
declare global {
    namespace Express {
        interface Request {
            user?: Document; // Adjust the type based on your actual User model
        }
    }
}

interface UserInterface {
    username: string,
    email: string,
    password: string
}

export interface UserDocType extends UserInterface, Document {}