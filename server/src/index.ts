import fastify from 'fastify';
import authRoutes from './api/auth/routes';
import habitsRoutes from './api/habits/routes';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import cors from '@fastify/cors';
import setupOpenAPI from './openAPI';
import fastifyStatic from '@fastify/static';
import path from 'path';

const app = fastify({
   logger: true,

   ajv: { customOptions: { $data: true } },
});

setupOpenAPI(app);

app.register(fastifyCookie, {});
app.register(fastifySession, {
   secret: 'cNaoPYAwF60HZJzkcNaoPYAwF60HZJzk',
   cookie: { secure: false },
});

app.get('/', (_, res) => res.code(200).send('health check'));

app.register(authRoutes, { prefix: '/api' });
app.register(habitsRoutes, { prefix: '/api' });

app.addHook('onRequest', async (req, res) => {
   if (
      req.url === '/' ||
      req.url === '/api/login' ||
      req.url === '/api/logout' ||
      req.url === '/api/signup'
   )
      return;
   if (!req.session.userId) {
      res.code(401).send();
   }
});

//server
app.listen(
   {
      port: (process.env.PORT as unknown as number) || 3000,
      host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : undefined,
   },
   function (err, address) {
      if (err) {
         app.log.error(err);
         process.exit(1);
      }
      console.log(`listening on ${address}`);
   }
);
