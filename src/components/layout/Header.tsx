import { HamburgerIcon } from '@chakra-ui/icons';
import {
   Box,
   Drawer,
   DrawerContent,
   DrawerOverlay,
   IconButton,
   useDisclosure,
} from '@chakra-ui/react';
import { HabitTodo } from 'pages/today';
import { Habit } from './AppLayout';
import Sidebar from './sidebar';

type HeaderProps = {
   habits: Habit[];
   todayHabitTodos: HabitTodo[];
};

export default function Header({ habits, todayHabitTodos }: HeaderProps) {
   // mobile sidebar modal
   const { isOpen, onClose, onOpen } = useDisclosure();

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
         <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="xs">
            <DrawerOverlay />
            <DrawerContent>
               <Sidebar
                  habits={habits}
                  todayHabitTodos={todayHabitTodos}
                  isMobile
                  onClose={onClose}
               />
            </DrawerContent>
         </Drawer>
      </>
   );
}
