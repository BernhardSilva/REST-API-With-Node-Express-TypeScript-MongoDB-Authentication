import express from 'express';
import { deteteUser, getAllUsers } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, deteteUser);
}