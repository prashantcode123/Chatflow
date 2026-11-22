import dotenv from 'dotenv'
dotenv.config()
import experss from 'express'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import messageRouter from './routes/message.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { app } from './socket/socket.js';
import dotenv from 'dotenv'
dotenv.config()

app.get("/", (req,res)=>{
    res.send("server is live")
})
app.use(cookieParser())
app.use(experss.json())
app.use(cors({
    origin: process.env.MODE == "production" ? process.env.CLIENT_URL : "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)
