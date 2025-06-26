import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import middleError from './middleware/error.middleware.js';
import routes from './routes/index.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes); 
app.use(middleError)


export default app;
