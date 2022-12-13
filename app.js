import express, { json, urlencoded } from "express";
import apiRouter from './src/routes/index.js';
import errorHandler from './src/middlewares/errorHandler.js';
import logger from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import mongoDb from "./src/config/mongo.config.js";

const app = express();

app.use(json());
app.use(urlencoded({extended: true}))
app.use(logger('dev'))

app.use('/api', apiRouter);

const connect = async () => {
    try{
        await mongoDb();
        console.info('mongoDB connected');
    }catch(err){
        console.error(err)
    }
};

//connect();


app.use(errorHandler);

export default app;