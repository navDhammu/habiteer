import { pool, sessions } from '../..';
import { AuthError, AuthErrorName } from './auth.errors';
import {
   getUserByEmail as getUserByEmailQuery,
   createNewUser as createNewUserQuery,
   ICreateNewUserParams,
} from './auth.queries';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

type Credentials = {
   email: string;
   password: string;
};

export const signup = async (userDetails: ICreateNewUserParams) => {
   const [user] = await getUserByEmailQuery.run({ email: userDetails.email }, pool);
   if (user) throw new AuthError(AuthErrorName.USER_EXISTS);
   const passwordHash = await bcrypt.hash(userDetails.email!, 10);
   await createNewUserQuery.run({ email: userDetails.email, password: passwordHash }, pool);
};

export const login = async ({ email, password }: Credentials) => {
   const [user] = await getUserByEmailQuery.run({ email }, pool);
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
