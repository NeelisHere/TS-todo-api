import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDB from './db.js';
import taskRouter from './routes/taskRoutes.js';
import authRouter from './routes/authRoutes.js';
import { errorMiddleware } from './middlewares/error.js';
import userRouter from './routes/userRoutes.js';

dotenv.config({
    path: './.env'
})
const port = process.env.PORT || 8000;
connectDB()

/**********************************************************/ 
const app = express();

app.use(cors({
    origin: [
        process.env.CLIENT_URL || 'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser()) 
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/tasks', taskRouter)
app.use(errorMiddleware)

/**********************************************************/ 

app.get('/', (req, res) => {
    res.json({ success: true, message: 'ok' })
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})