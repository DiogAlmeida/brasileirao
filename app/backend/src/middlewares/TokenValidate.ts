import { NextFunction, Request, Response } from 'express';
import createToken from '../utils/createToken';

export default class tokenValidate {
  static validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const verifyToken = createToken.verifyToken(token);

      req.body.token = verifyToken;

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
