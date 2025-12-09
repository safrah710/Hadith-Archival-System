import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import controller from './Controller/index.js';
const app=express();
const PORT=3000||process.env.port;
app.use(cors());
app.use(express.json());
app.use(controller);
console.log("safee is starting ")
app.listen(PORT,()=>{
    console.log(`App is running at the ${PORT}`)
})
