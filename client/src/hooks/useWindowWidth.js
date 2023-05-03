import { useEffect, useState } from 'react';

function useWindowWidth() {
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   useEffect(() => {
      const listener = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', listener);
      return () => window.removeEventListener('resize', listener);
   }, []);

   return windowWidth;
}

export default useWindowWidth;
