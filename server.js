import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

//config env
dotenv.config();

//database config
connectDB();

//rest api
const app = express();

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);

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