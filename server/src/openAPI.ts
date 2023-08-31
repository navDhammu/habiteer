import fastifySwagger from '@fastify/swagger';
import { FastifyInstance } from 'fastify';
import fs from 'fs';
import { generate } from 'openapi-typescript-codegen';
import { selectCompletionSchema } from './completions/dbSchema';
import { selectHabitSchema } from './habits/dbSchema';

export default function setupOpenAPI(app: FastifyInstance) {
   if (process.env.NODE_ENV === 'production') return;

   app.register(fastifySwagger, {
      openapi: {
         openapi: '3.1.0',
         components: {
            schemas: {
               Habit: selectHabitSchema,
               Completion: selectCompletionSchema,
            },
            securitySchemes: {
               cookieAuth: {
                  type: 'apiKey',
                  in: 'cookie',
                  name: 'sessionId',
               },
            },
         },
         security: [{ cookieAuth: [] }],
      },
   });

   // generate api client
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
               useUnionTypes: true,
            });
         }
      });
   });
}
