import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import authService from '../services/auth.service';
import { jwt } from '../../utils/helper';
import cloudinaryService from '../services/cloudinary.service';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ZOD
    const schemas = z.object({
      username: z
        .string({
          required_error: 'username is a required field',
          invalid_type_error: 'username must be a string',
        })
        .min(3, 'must be 3 or more characters long')
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
    if (entity) {
      const token = jwt.sign(entity.id);
      res.status(200).json({
        user: {
          ...entity,
          id: undefined,
          email: undefined,
        },
        token,
      });
    }
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
    if (entity) {
      const token = jwt.sign(entity.id);
      res.status(200).json({
        user: {
          ...entity,
          id: undefined,
          email: undefined,
        },
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const entity = await authService.auth(id);
    if (entity) {
      res.status(200).json({ user: { ...entity, email: undefined, id: undefined } });
    }
  } catch (error) {
    next(error);
  }
};

const avatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file) {
      const url = await cloudinaryService.uploader(req);
      if (url) {
        const user = await authService.avatar(req.user.id, url);
        res.status(200).json({ user: { ...user, id: undefined, email: undefined } });
      }
    }
  } catch (error: any) {
    console.log(error);
    if (error) {
      res.status(400).json({ status: 400, messages: 'Invalid image file' });
    }
    next(error);
  }
};

export default { signin, signup, auth, avatar };
