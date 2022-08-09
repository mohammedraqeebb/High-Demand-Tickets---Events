import express, { Request, Response } from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import { RequestValidatonError } from './../errors/request-validation-error';
import { User } from '../models/user';
import { BadRequestError } from './../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import jwt from 'jsonwebtoken';

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('please provide email and password');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('email already in use');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(201).send({ user });
  }
);

export { router as signUpRouter };
