import { useAuthContext } from 'context/AuthContext';
import { useState } from 'react';
import { APIError } from 'src/api';
import { HttpStatusText } from 'src/api/HttpStatusText';

// type Errors = 'Bad Request' | 'unknown' | ''

export default function useAPIErrorHandler() {
   const [error, setError] = useState<HttpStatusText | 'Unknown' | ''>('');
   const { logoutUser } = useAuthContext();

   const errorHandler = (err: unknown) => {
      if (err instanceof APIError) {
         if (err.statusText === 'Unauthorized') {
            logoutUser();
         }
         setError(err.statusText);
      } else {
         setError('Unknown');
      }
   };

   return {
      error,
      errorHandler,
   };
}
