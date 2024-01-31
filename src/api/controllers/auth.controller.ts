import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import authService from '../services/auth.service';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ZOD
    const schemas = z.object({
      username: z
        .string({
          required_error: 'username is a required field',
          invalid_type_error: 'username must be a string',
        })
        .min(5, 'must be 4 or more characters long')
        .max(10, 'Must be 10 or fewer characters long'),
      email: z
        .string({
          invalid_type_error: 'email is required field',
          required_error: 'email must be a string',
        })
        .email('invalid email address'),
      password: z
        .string({
          required_error: 'password is a required field',
          invalid_type_error: 'password must be a string',
        })
        .min(5, 'must be 5 or more characters long'),
    });
    const body = schemas.parse(req.body);
    const entity = await authService.signup({ ...body, avatar: 'avatar.png' });
    res.status(200).json(entity);
  } catch (error) {
    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ZOD
    const schemas = z.object({
      email: z
        .string({
          invalid_type_error: 'email is required field',
          required_error: 'email must be a string',
        })
        .email('invalid email address'),
      password: z
        .string({
          required_error: 'password is a required field',
          invalid_type_error: 'password must be a string',
        })
        .min(5, 'must be 5 or more characters long'),
    });
    const body = schemas.parse(req.body);
    const entity = await authService.signin(body);
    res.status(200).json(entity);
  } catch (error) {
    next(error);
  }
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

export default { signin, signup, auth };
