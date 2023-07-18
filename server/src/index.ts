import Fastify from 'fastify';
import authRoutes from './api/auth/routes';
import habitsRoutes from './api/habits/routes';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import cors from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import fs from 'fs';
import { generate } from 'openapi-typescript-codegen';

const app = Fastify({
   ajv: { customOptions: { $data: true } },
});

app.register(cors, { credentials: true, origin: 'http://localhost:5173' });
app.register(fastifyCookie, {});
app.register(fastifySession, {
   secret: 'cNaoPYAwF60HZJzkcNaoPYAwF60HZJzk',
   cookie: { secure: false },
});

app.register(fastifySwagger, {
   openapi: {
      info: {
         title: 'Habit tracker',
         description: 'Open api spec for habit tracker (habiteer)',
         version: '0.1.0',
      },
      servers: [
         {
            url: 'http://localhost',
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

app.listen({ port: 3000 }, function (err, address) {
   if (err) {
      app.log.error(err);
      process.exit(1);
   }
   console.log(`listening on ${address}`);
});

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
