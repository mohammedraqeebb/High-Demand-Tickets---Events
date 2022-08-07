import express, { Request, Response } from 'express';
import { Password } from './../services/password';
import { BadRequestError } from './../errors/bad-request-error';
import { body } from 'express-validator';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('email must be valid'),
    body('password').trim().notEmpty().withMessage('password is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('this email does not exist');
    }

    const passwordMatched = Password.compare(existingUser.password, password);

    if (!passwordMatched) {
      throw new BadRequestError('incorrect password');
    }
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
