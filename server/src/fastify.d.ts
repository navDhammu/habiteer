import Fastify from 'fastify';

declare module 'fastify' {
   interface Session {
      userId: number;
   }
}
