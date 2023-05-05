import * as dotenv from 'dotenv'
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

dotenv.config()

const secret = process.env.TOKEN

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;
  if(!authToken) {
    return res.status(401).json({ message: 'Token is missing!'});
  }

  const [, token] = authToken.split(' ');
  try{
    verify(token, secret)
    
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token!'})
  }

}