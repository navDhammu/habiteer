import fastify from 'fastify';
import authRoutes from './api/auth/routes';
import habitsRoutes from './api/habits/routes';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import cors from '@fastify/cors';
import setupOpenAPI from './openAPI';
import fastifyStatic from '@fastify/static';

const app = fastify({
   logger: true,
   ajv: { customOptions: { $data: true } },
});

app.register(cors, {
   credentials: true,
   origin: ['http://localhost:5173'],
});

app.register(fastifyCookie, {});
app.register(fastifySession, {
   secret: 'cNaoPYAwF60HZJzkcNaoPYAwF60HZJzk',
   cookie: { secure: false },
});
app.register(fastifyStatic, { root: '../dist' });

setupOpenAPI(app);

//public
app.get('/', (req, res) => {
   res.sendFile('index.html');
});

//private routes
app.register(
   (instance, opts) => {
      instance.register(authRoutes);
      instance.register(habitsRoutes);
      instance.addHook('preHandler', async (req, res) => {
         if (
            req.url === '/api/login' ||
            req.url === '/api/logout' ||
            req.url === '/api/signup'
         )
            return;
         // if (req.url === '/health-check') return res.code(200).send();
         if (!req.session.userId) {
            res.code(401).send();
         }
      });
   },
   { prefix: '/api' }
);

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
