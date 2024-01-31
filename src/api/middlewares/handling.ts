import { NextFunction, Request, Response } from 'express';

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'ZodError') {
    const obj = JSON.parse(error.message);
    res.status(400).json({ status: 400, messages: obj.map(er => er.message) });
  } else if (error.name === 'PrismaClientInitializationError') {
    res
      .status(500)
      .json({ status: 500, messages: ['please make sure your database server is running at'] });
  } else if (error.name === 'PrismaClientKnownRequestError') {
    res.status(409).json({ status: 409, messages: ['unique constraint failed on the fields'] });
  } else if (error.name === 'HttpExcept') {
    const obj = JSON.parse(error.message);
    res.status(obj.status).json({ status: obj.status, messages: obj.message });
  } else if (error.name === 'JsonWebTokenError') {
    res.status(401).json({ status: 401, message: error.message });
  }

  console.log('HANDLING', error.name);
  console.log('HANDLING', error.message);
  next();
};
