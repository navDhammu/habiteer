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

export default function Header() {
   const { isOpen: isMobileSidebarOpen, onClose, onOpen } = useDisclosure();

   return (
      <>
         <Box as="header" display={['block', null, 'none']}>
            <IconButton
               aria-label="menu"
               icon={<HamburgerIcon />}
               variant="unstyled"
               boxSize="8"
               onClick={onOpen}
            />
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
