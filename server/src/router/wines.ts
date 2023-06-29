import express from 'express';

import { isAuthenticated } from '../middlewares';
import { createNewWine, getAllWines } from '../controllers/wines';

export default (router: express.Router) => {
    router.post('/wines', isAuthenticated, createNewWine);
    router.get('/wines', isAuthenticated, getAllWines);
};