import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';

const root = createRoot(document.getElementById('root'));

root.render(
	<ChakraProvider>
		<App />
		);
	</ChakraProvider>
);

reportWebVitals();
