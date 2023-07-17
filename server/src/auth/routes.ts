import {
   FastifyPluginAsync,
   FastifyReply,
   FastifyRequest,
   HookHandlerDoneFunction,
} from 'fastify';
import { signup } from './services';
import { FromSchema } from 'json-schema-to-ts';
import { loginSchema, signupSchema } from './schemas';
import { login } from './services';

const authRoutes: FastifyPluginAsync = async (fastify, opts) => {
   fastify.post<{ Body: FromSchema<(typeof signupSchema)['body']> }>(
      '/signup',
      {
         schema: signupSchema,
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

   fastify.post<{ Body: FromSchema<(typeof loginSchema)['body']> }>(
      '/login',
      { schema: loginSchema, preHandler: handleAlreadySignedIn },
      async (req, res) => {
         const { email, password } = req.body;
         const user = await login({ email, password });
         req.session.userId = user.id;
         res.send(user);
      }
   );

   fastify.post('/logout', async (req, res) => {
      await req.session.destroy();
      res.send('Logout Successful');
   });
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
