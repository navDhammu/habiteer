import {
   FastifyPluginAsync,
   FastifyReply,
   FastifyRequest,
   HookHandlerDoneFunction,
} from 'fastify';
import { signup } from './services';
import {
   loginBodySchema,
   signupBodySchema,
   SignupBodyType,
   LoginBodyType,
} from './schemas';
import { login } from './services';

const authRoutes: FastifyPluginAsync = async (fastify, opts) => {
   fastify.post<{ Body: SignupBodyType }>(
      '/signup',
      {
         schema: {
            tags: ['auth'],
            operationId: 'signup',
            body: signupBodySchema,
         },
         preHandler: handleAlreadySignedIn,
      },
      async (req, res) => {
         const insertedId = await signup({
            email: req.body.email,
            password: req.body.password,
         });
         req.session.userId = insertedId;
         res.send('User created');
      }
   );

   fastify.post<{ Body: LoginBodyType }>(
      '/login',
      {
         schema: {
            tags: ['auth'],
            operationId: 'login',
            body: loginBodySchema,
         },
         preHandler: handleAlreadySignedIn,
      },
      async (req, res) => {
         const { email, password } = req.body;
         const user = await login({ email, password });
         req.session.userId = user.id;
         res.send(user);
      }
   );

   fastify.post(
      '/logout',
      {
         schema: {
            tags: ['auth'],
            operationId: 'logout',
         },
      },
      async (req, res) => {
         await req.session.destroy();
         res.send('Logout Successful');
      }
   );
};

function handleAlreadySignedIn(
   req: FastifyRequest,
   res: FastifyReply,
   done: HookHandlerDoneFunction
) {
   const user = req.session.get<any>('user');
   if (user) {
      res.send(user);
   }
   done();
}

export default authRoutes;
