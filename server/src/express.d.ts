type User = {
   id: number;
   name: string | null;
   email: string;
};

declare namespace Express {
   interface Request {
      user?: User;
   }
}
