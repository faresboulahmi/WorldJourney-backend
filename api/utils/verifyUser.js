import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.body.access_token;
  if (!token) return next(errorHandler(401, 'Token expired, please log in again'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Unauthorized'));

    req.user = user;


    next();
  });
};

