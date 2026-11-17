import dotenv from 'dotenv'
import { connectToDB } from './src/config/db.js';
import { server } from './src/socket/socket.js';
import './src/main.js'
dotenv.config()

const port = process.env.PORT || 5000;

server.listen(port,()=>{
    connectToDB()
    console.log("Server is live")
})
