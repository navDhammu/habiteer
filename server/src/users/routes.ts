import {
   FastifyPluginAsyncTypebox,
   Type,
} from '@fastify/type-provider-typebox';
import { insertUserSchema } from './dbSchema';
import { login, signup } from './services';

const usersRoutes: FastifyPluginAsyncTypebox = async (instance, opts) => {
   instance.decorateRequest;
   instance.post(
      '/signup',
      {
         schema: {
            tags: ['auth'],
            operationId: 'signup',
            body: Type.Omit(insertUserSchema, ['id']),
         },
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

   instance.post(
      '/login',
      {
         schema: {
            tags: ['auth'],
            operationId: 'login',
            body: Type.Pick(insertUserSchema, ['email', 'password']),
         },
      },
      async (req, res) => {
         const { email, password } = req.body;
         const user = await login({ email, password });
         req.session.userId = user.id;
         res.send(user);
      }
   );

   instance.post(
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

export default usersRoutes;
