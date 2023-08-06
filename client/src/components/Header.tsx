import { HamburgerIcon } from '@chakra-ui/icons';
import {
   Box,
   Drawer,
   DrawerContent,
   DrawerOverlay,
   IconButton,
   useDisclosure,
} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { Avatar, HStack, Text } from '@chakra-ui/react';
import { useAuthContext } from 'context/AuthContext';

export default function Header() {
   const { isOpen: isMobileSidebarOpen, onClose, onOpen } = useDisclosure();
   const { user } = useAuthContext();

   return (
      <>
         <Box
            px={[3, null, 6]}
            py={[2, null, 4]}
            as="header"
            display="flex"
            justifyContent="space-between"
            // display={['block', null, 'none']}
         >
            <IconButton
               // display={[null, null, 'none']}
               visibility={[null, null, 'hidden']}
               aria-label="menu"
               icon={<HamburgerIcon boxSize={6} />}
               variant="unstyled"
               boxSize="8"
               onClick={onOpen}
            />
            <HStack>
               <Avatar size="sm" />
               <Text>{user?.name || user?.email}</Text>
            </HStack>
         </Box>
         <Drawer
            isOpen={isMobileSidebarOpen}
            onClose={onClose}
            placement="left"
            size="xs"
         >
            <DrawerOverlay />
            <DrawerContent>
               <Sidebar isMobile onClose={onClose} />
            </DrawerContent>
         </Drawer>
      </>
   );
}
