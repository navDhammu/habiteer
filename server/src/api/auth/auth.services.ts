import { pool, sessions } from '../..';
import { getUserByEmail, insertUser } from '../../db/usersTable';
import { AuthError, AuthErrorName } from './auth.errors';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

type Credentials = {
   email: string;
   password: string;
};

export const signup = async (userDetails: Credentials) => {
   const [user] = await getUserByEmail(userDetails.email);
   if (user) throw new AuthError(AuthErrorName.USER_EXISTS);
   const passwordHash = await bcrypt.hash(userDetails.email, 10);
   await insertUser({ email: userDetails.email, password: passwordHash });
};

export const login = async ({ email, password }: Credentials) => {
   const [user] = await getUserByEmail(email);
   if (!user || !(await bcrypt.compare(password, user.password)))
      throw new AuthError(AuthErrorName.INVALID_CREDENTIALS);

   const sessionId = randomUUID();
   sessions[sessionId] = {
      userId: user.id,
      name: user.name,
      email: user.email,
   };
   return sessionId;
};

export const logout = async (sessionId: string) => {
   delete sessions[sessionId];
};
