import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import api from './api';
import handling from './api/middlewares/handling';

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS }));
app.use(morgan('dev'));

app.use(handling);
app.use('/api', api);

const PORT = process.env;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
