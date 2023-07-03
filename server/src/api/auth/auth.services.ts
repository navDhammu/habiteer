import { sessions } from '../..';
import { createUser, getUserByEmail } from './auth.queries';
import { AuthError, AuthErrorName } from './auth.errors';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

type Credentials = {
   email: string;
   password: string;
};

export async function signup(userDetails: Credentials) {
   const user = await getUserByEmail(userDetails.email);
   if (user) throw new AuthError(AuthErrorName.USER_EXISTS);
   const passwordHash = await bcrypt.hash(userDetails.email, 10);
   await createUser({ email: userDetails.email, password: passwordHash });
}

export async function login({ email, password }: Credentials) {
   const user = await getUserByEmail(email);
   if (!user || !(await bcrypt.compare(password, user.password)))
      throw new AuthError(AuthErrorName.INVALID_CREDENTIALS);

   const sessionId = randomUUID();
   sessions[sessionId] = {
      userId: user.id,
      name: user.name,
      email: user.email,
   };
   return { user: { email: user.email, name: user.name }, sessionId };
}

export const logout = async (sessionId: string) => {
   delete sessions[sessionId];
};
