import express from 'express';
import { merge, get } from 'lodash';
import { getUserBySessionToken } from '../db/users'; 
import { COOKIES_AUTH } from '../../constants';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    console.log('Auth ', COOKIES_AUTH);
    const sessionToken = req.cookies[COOKIES_AUTH];

    if (!sessionToken) {
      console.log('Auth - no sessiontoken ', req.cookies);
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      console.log('Auth - no existingUser ', existingUser);
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}