import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const TOKEN_PASS = process.env.TOKEN_PASS || '';

function verify(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const auth = req.headers?.authorization;

  if (!auth) return res.status(400).json({ error: 'token must be provided' });

  const token = auth.split('Bearer ')[1];

  return jwt.verify(token, TOKEN_PASS, (error, result) => {
    if (error) return res.status(401).json({ error: 'token is invalid' });

    req.token = result;

    return next();
  });
}

export default {
  verify,
};
