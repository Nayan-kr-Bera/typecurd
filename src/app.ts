import express from 'express';
import connectDB from './db/db';
import healthcheck from './routes/healthcheck';
import ProductRoute from './routes/product.route';
import path from 'path';
import {Express} from "express"

const app: Express = express();
//add middleware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* routes */
app.use('/healthcheck', healthcheck);
app.use('/products', ProductRoute );
app.use('/uploads', express.static(path.join(__dirname, './uploads')));


app.listen(3000, async() => {
    console.log('Server is running on port 3000');
    await connectDB()
});