import { useRef } from 'react';

export default function useOnOutsideClick(handleOutsideClick) {
   const cleanupRef = useRef();

   const setRef = (node) => {
      if (cleanupRef.current) cleanupRef.current();
      if (node !== null) {
         const listener = (e) => {
            console.log(e.target);
            if (!node.contains(e.target)) handleOutsideClick();
         };
         document.getElementById('root').addEventListener('click', listener);
         cleanupRef.current = () =>
            document
               .getElementById('root')
               .removeEventListener('click', listener);
      }
   };

   return setRef;
}
