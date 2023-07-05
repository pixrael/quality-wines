import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router';
import { PORT, MONGO_URL } from '../constants';

const app = express();

app.use((req, res, next) => {
    // Set the appropriate headers for CORS
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials

    // Continue to the next middleware
    next();
});

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT || 8080, () => {
    console.log(`Server running on http://localhost:${PORT || 8080}/`);
});

mongoose.connection.on('error', (error: Error) => {
    console.log(error);
})

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

app.use('/', router()); 