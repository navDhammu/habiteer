import { useEffect, useState } from 'react';
import { useAuthContext } from 'context/AuthContext';

type Options = {
   dependency?: React.DependencyList;
   condition?: boolean;
};

export default function useAPI<T>(
   fn: () => Promise<T>,
   options: Options = {
      dependency: [],
      condition: true,
   }
) {
   const [data, setData] = useState<T | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);
   const { logoutUser } = useAuthContext();

   useEffect(() => {
      if (options.condition) {
         fn()
            .then((data) => setData(data))
            .catch((err: Error) => {
               setError(err);
               if (err.name === 'Unauthorized') {
                  logoutUser();
               }
            })
            .finally(() => setIsLoading(false));
      }
   }, options.dependency);

   return { data, isLoading, error };
}
