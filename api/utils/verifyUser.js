import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies.access_token);
  console.log(req.cookies);
  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};

export const setCookieOptions = (req, res, next) => {
  const cookieOptions = {
    sameSite: 'None',
    // secure: true,
    httpOnly: true
  };
  
  res.cookie('access_token', '', cookieOptions); // Example cookie, replace with actual token if needed
  
  next();
};
