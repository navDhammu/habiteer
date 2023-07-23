import {
   Menu,
   MenuButton,
   IconButton,
   MenuItem,
   MenuList,
   Icon,
   useDisclosure,
} from '@chakra-ui/react';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import HabitFormDrawer from 'components/HabitForm/HabitFormDrawer';
import ConfirmDeleteHabit from './ConfirmDeleteHabit';
import { Habit } from '@api';

export default function HabitCardMenuDropdown({ habit }: { habit: Habit }) {
   const habitFormDrawer = useDisclosure();
   const alertDialog = useDisclosure();

   return (
      <>
         {' '}
         <Menu>
            <MenuButton
               as={IconButton}
               variant="ghost"
               ml="auto"
               aria-label="habit actions"
               icon={<IconDotsVertical />}
            />
            <MenuList>
               <MenuItem onClick={habitFormDrawer.onOpen}>
                  <Icon as={IconEdit} mr="3" />
                  Edit
               </MenuItem>
               <MenuItem onClick={alertDialog.onOpen} color="red">
                  <Icon as={IconTrash} mr="3" />
                  Delete
               </MenuItem>
            </MenuList>
         </Menu>
         <HabitFormDrawer
            isDrawerOpen={habitFormDrawer.isOpen}
            onCloseDrawer={habitFormDrawer.onClose}
         />
         <ConfirmDeleteHabit
            alertDialog={alertDialog}
            deleteHabitId={habit.id}
            deleteHabitName={habit.name}
         />
      </>
   );
}
