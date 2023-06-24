import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { pool, sessions } from '../..';
import { sql } from '@pgtyped/runtime';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { IUserExistsQuery, ISignupUserQuery } from './routes.types';

const authRouter = Router();

const getUserByEmail = async (email: string) => {
   const userExists = sql<IUserExistsQuery>`SELECT * FROM users WHERE email = $email`;
   const [user] = await userExists.run({ email }, pool);
   return user;
};

// handles already logged in
authRouter.use((req, res, next) => {
   const session = sessions[req.cookies?.session_id];
   if (session) return res.json({ email: session.email });
   next();
});

authRouter.post(
   '/signup',
   body('email').isEmail(),
   body('password').isLength({ min: 8 }),
   body('passwordConfirmation').custom((value, { req }) => {
      return value === req.body.password;
   }),
   async (req, res) => {
      const validations = validationResult(req);
      if (!validations.isEmpty()) return res.sendStatus(400);
      try {
         //check if user exists
         if (await getUserByEmail(req.body.email))
            return res.status(409).send('User with email already exists');

         //create user
         const passwordHash = await bcrypt.hash(req.body.password, 10);
         const signupUser = sql<ISignupUserQuery>`INSERT INTO users (email, password) VALUES ($email, $password)`;
         await signupUser.run({ email: req.body.email, password: passwordHash }, pool);
         res.status(201).send(`user ${req.body.email} has been created`);
      } catch (error) {
         res.sendStatus(500);
      }
   }
);

authRouter.post(
   '/login',
   body('email').isEmail(),
   body('password').isLength({ min: 8 }),
   async (req, res) => {
      const validations = validationResult(req);
      if (!validations.isEmpty()) return res.sendStatus(400);

      const user = await getUserByEmail(req.body.email);

      if (!user || !(await bcrypt.compare(req.body.password, user.password)))
         return res.status(400).send('Invalid email or password');

      const sessionId = randomUUID();
      sessions[sessionId] = {
         userId: user.id,
         name: user.name,
         email: user.email,
      };
      res.cookie('session_id', sessionId, {
         httpOnly: true,
      })
         .json({ email: user.email })
         .end();
   }
);

authRouter.post('/logout', async (req, res) => {
   delete sessions[req.cookies.session_id];
   res.clearCookie('session_id').end();
});

export default authRouter;
