import Fastify from 'fastify';
import authRoutes from './api/auth/routes';
import habitsRoutes from './api/habits/routes';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import cors from '@fastify/cors';

const app = Fastify({
   logger: true,
   ajv: { customOptions: { $data: true } },
});

app.register(cors, { credentials: true, origin: 'http://localhost:5173' });
app.register(fastifyCookie, {});
app.register(fastifySession, {
   secret: 'cNaoPYAwF60HZJzkcNaoPYAwF60HZJzk',
   cookie: { secure: false },
});

app.addHook('preHandler', async (req, res) => {
   if (
      req.url === '/api/login' ||
      req.url === '/api/logout' ||
      req.url === '/api/signup'
   )
      return;
   if (!req.session.userId) {
      res.code(401).send();
   }
});

//routes
app.register(authRoutes, { prefix: '/api' });
app.register(habitsRoutes, { prefix: '/api' });

app.listen({ port: 3000 }, function (err, address) {
   if (err) {
      app.log.error(err);
      process.exit(1);
   }
   console.log(`listening on ${address}`);
});
