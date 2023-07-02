declare namespace Express {
   interface Request {
      user: {
         email: string;
         id: number;
      };
   }
}
