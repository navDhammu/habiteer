import { Box, Flex } from '@chakra-ui/react';
import { ReactElement } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppLayout({ view }: { view: ReactElement }) {
   return (
      <Flex h="100vh" direction={['column', null, 'row']}>
         <Sidebar />
         <Box flex="1" overflowY="scroll">
            <Header />
            <Box as="main" flex="1" p={[2, 6, 8]} bg="gray.50">
               {view}
            </Box>
         </Box>
      </Flex>
   );
}
