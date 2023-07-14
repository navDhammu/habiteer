import { User } from 'types/User';
import fetchWrapper, { BASE_URL } from '.';

export default {
   login: async (credentials: { email: string; password: string }) => {
      const response = await fetchWrapper(`${BASE_URL}/login`, {
         method: 'POST',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(credentials),
      });
      return response.json() as Promise<User>;
   },

   logout: async () => {
      await fetchWrapper(`${BASE_URL}/logout`, {
         method: 'POST',
         credentials: 'include',
      });
      return Promise.resolve();
   },
};
