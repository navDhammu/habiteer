import useValidContext from 'hooks/useValidContext';
import { createContext } from 'react';
import { User } from 'types/User';
import { ReactNode, useState } from 'react';
import authAPI from 'src/api/authAPI';
import { APIError } from 'src/api';

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
   const [error, setError] = useState('');

   const loginUser: AuthContextType['loginUser'] = async (details) => {
      try {
         const user = await authAPI.login(details);
         localStorage.setItem('user', JSON.stringify(user));
         setUser(user);
         setError('');
      } catch (error) {
         console.log(error);
         if (error instanceof APIError && error.statusText === 'Unauthorized')
            setError('Invalid email and/or password combination');
         else setError('Something went wrong, please try again later');
      } finally {
         setIsLoading(false);
      }
   };

   const logoutUser = async () => {
      await authAPI.logout();
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
