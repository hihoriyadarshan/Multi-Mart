import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

//config env
dotenv.config();

//database config
connectDB();

//rest api
const app = express();

//middleware
app.use(express.json())
app.use(morgan('dev'))


//rest api
app.get('/',(req,res) => {
    res.send('<h1>welcome to MultiMart app</h1>');
});

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT,() => {
    console.log(`server Running on mode ${process.env.DEV_MODE} on Port${PORT}`.bgCyan.white);
});