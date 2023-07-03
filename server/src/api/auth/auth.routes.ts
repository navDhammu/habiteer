import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { sessions } from '../..';
import { login, logout, signup } from './auth.services';
import { AuthError } from './auth.errors';

const authRouter = Router();

authRouter.post('/logout', async (req, res) => {
   try {
      await logout(req.cookies.session_id);
      res.clearCookie('session_id').end();
   } catch (error) {
      if (error instanceof AuthError)
         res.status(error.httpCode).send(error.message);
      else res.sendStatus(500);
   }
});

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
      const { email, password } = req.body;
      const validations = validationResult(req);
      if (!validations.isEmpty()) return res.sendStatus(400);

      try {
         await signup({ email, password });
         res.status(201).send(`user ${req.body.email} has been created`);
      } catch (error) {
         if (error instanceof AuthError)
            res.status(error.httpCode).send(error.message);
         else res.sendStatus(500);
      }
   }
);

authRouter.post(
   '/login',
   body('email').isEmail(),
   body('password').isLength({ min: 8 }),
   async (req, res) => {
      const validations = validationResult(req);
      if (!validations.isEmpty()) return res.sendStatus(401);
      const { email, password } = req.body;

      try {
         const { user, sessionId } = await login({ email, password });
         res.cookie('session_id', sessionId, {
            httpOnly: true,
         }).json(user);
      } catch (error) {
         console.log(error);
         if (error instanceof AuthError)
            res.status(error.httpCode).send(error.message);
         else res.sendStatus(500);
      }
   }
);

export default authRouter;
