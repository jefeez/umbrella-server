import { NextFunction, Request, Response } from 'express';
import { HttpExcept, jwt } from '../../utils/helper';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      HttpExcept('no token provided', 401);
    } else {
      const [, token] = authorization.split(' ');
      if (!token) {
        HttpExcept('no token provided', 401);
      } else {
        const verify = jwt.verify(token);
        if (!verify) {
          HttpExcept('invalid token', 401);
        } else {
          const decode = jwt.decode(token)!;
          req.user = {
            id: decode.sub as string,
          };
          next();
        }
      }
    }
  } catch (error) {
    next(error);
  }
};
