import { createRoot } from 'react-dom/client'
import App from './App'
// import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import AuthProvider from './AuthProvider'

const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: '#F7FAFC',
            },
        }),
    },
})

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <ChakraProvider theme={theme}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ChakraProvider>
)

// reportWebVitals();
