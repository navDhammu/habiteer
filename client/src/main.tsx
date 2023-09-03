import { createRoot } from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
   styles: {
      global: () => ({
         body: {
            bg: '#F7FAFC',
         },
      }),
   },
});

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
   <ChakraProvider theme={theme}>
      <App />
   </ChakraProvider>
);

// reportWebVitals();
