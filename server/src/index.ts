import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router';
import { PORT, MONGO_URL, WHITELIST_IP_1, WHITELIST_IP_2, WHITELIST_IP_3 } from '../constants';

const app = express();

app.use((req, res, next) => {
    // Set the appropriate headers for CORS
    console.log('req ', req.headers.origin)
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
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
    console.log(`Server running`);
});

mongoose.connection.on('error', (error: Error) => {
    console.log(error);
})

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
    .then(conn => console.log('connection database  - ok ! -'))
    .catch(err => console.log('error database ', err))
    ;

app.use('/', router()); 