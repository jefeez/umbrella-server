import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import api from './api';
import handling from './api/middlewares/handling';
import socket from './io';

const app = express();
const server = http.createServer(app);

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS }));
app.use(morgan('dev'));

const io = new Server(server, { cors: { origin: process.env.CORS } });

io.on('connection', socket);

app.use((request, response, next) => {
  request.io = io;
  next();
});

app.use('/api', api);
app.use(handling);

const { PORT } = process.env;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
