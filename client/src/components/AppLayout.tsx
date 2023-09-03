import { Box } from '@chakra-ui/react';
import { ReactElement } from 'react';
import Header from './Header';

export default function AppLayout({ view }: { view: ReactElement }) {
   return (
      <Box flex="1" overflowY="scroll">
         <Header />
         <Box as="main" flex="1" p={[2, 5, 6]} bg="gray.50">
            {view}
         </Box>
      </Box>
   );
}
