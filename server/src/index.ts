import fastify from 'fastify';
import authRoutes from './api/auth/routes';
import habitsRoutes from './api/habits/routes';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import cors from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import fs from 'fs';
import { habitSchema } from './api/habits/schemas/habitSchema';
import { generate } from 'openapi-typescript-codegen';
import { config } from 'dotenv';

config();

const app = fastify({
   logger: true,
   ajv: { customOptions: { $data: true } },
});

app.register(cors, { credentials: true });
app.register(fastifyCookie, {});
app.register(fastifySession, {
   secret: 'cNaoPYAwF60HZJzkcNaoPYAwF60HZJzk',
   cookie: { secure: false },
});

app.register(fastifySwagger, {
   openapi: {
      openapi: '3.1.0',
      components: {
         schemas: { Habit: habitSchema as {} },
         securitySchemes: {
            cookieAuth: {
               type: 'apiKey',
               in: 'cookie',
               name: 'sessionId',
            },
         },
      },
      security: [{ cookieAuth: [] }],
      servers: [
         {
            url: 'http://localhost:3000',
         },
      ],
   },
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
app.get('/health-check', (req, res) => res.code(200).send());

app.listen(
   { port: (process.env.PORT as unknown as number) || 3000, host: '0.0.0.0' },
   function (err, address) {
      if (err) {
         app.log.error(err);
         process.exit(1);
      }
      console.log(`listening on ${address}`);
   }
);

app.ready().then(() => {
   const fileLocation = './api-spec.json';

   fs.readFile(fileLocation, 'utf-8', (err, data) => {
      const newSpec = JSON.stringify(app.swagger());
      const existingSpec = JSON.stringify(JSON.parse(data));
      if (newSpec === existingSpec) {
         console.log('NO changes in api spec');
      } else {
         console.log('changes detected in api spec');
         fs.writeFile(fileLocation, newSpec, (err) => {
            if (err) console.log('error writing api spec file', err);
         });
         generate({
            input: fileLocation,
            output: '../client/src/api',
         });
      }
   });
});
