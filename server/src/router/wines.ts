import express from 'express';

import { isAuthenticated } from '../middlewares';
import { createNewWine, getAllWines, getAWineById, updateWine, deleteWine } from '../controllers/wines';

export default (router: express.Router) => {
    router.post('/wines', isAuthenticated, createNewWine);
    router.get('/wines', isAuthenticated, getAllWines);
    router.get('/wines/:id', isAuthenticated, getAWineById);
    router.patch('/wines/:id', isAuthenticated, updateWine);
    router.delete('/wines/:id', isAuthenticated, deleteWine);
};