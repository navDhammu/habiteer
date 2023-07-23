import useValidContext from 'context/useValidContext';
import { createContext } from 'react';
import { User } from 'types/User';
import { ReactNode, useState } from 'react';
import { ApiError, AuthService } from '@api';

export type AuthContextType = {
   user: User | null;
   isLoading: boolean;
   error: string;
   loginUser: (details: { email: string; password: string }) => void;
   logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => useValidContext(AuthContext);

const getUserFromLocalStorage = () => {
   try {
      const user = localStorage.getItem('user');
      if (user === null) return null;
      return JSON.parse(user);
   } catch (error) {
      // incase error in json parsing
      return null;
   }
};

export default function AuthProvider({ children }: { children: ReactNode }) {
   const [user, setUser] = useState<User | null>(getUserFromLocalStorage);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<AuthContextType['error']>('');

   const loginUser: AuthContextType['loginUser'] = async (details) => {
      setIsLoading(true);
      try {
         const user = await AuthService.login(details);
         localStorage.setItem('user', JSON.stringify(user));
         setUser(user);
      } catch (error) {
         error instanceof ApiError
            ? setError(error.body.message)
            : setError('Something went wrong');
      } finally {
         setIsLoading(false);
      }
   };

   const logoutUser = async () => {
      await AuthService.logout();
      localStorage.removeItem('user');
      setUser(null);
   };

   return (
      <AuthContext.Provider
         value={{ user, loginUser, logoutUser, error, isLoading }}
      >
         {children}
      </AuthContext.Provider>
   );
}
