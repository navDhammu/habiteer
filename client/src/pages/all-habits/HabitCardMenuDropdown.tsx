import {
   Menu,
   MenuButton,
   IconButton,
   MenuItem,
   MenuList,
   Icon,
   useDisclosure,
} from '@chakra-ui/react';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import ConfirmDeleteHabit from './ConfirmDeleteHabit';
import { Habit } from '@api';

export default function HabitCardMenuDropdown({ habit }: { habit: Habit }) {
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
               <MenuItem onClick={alertDialog.onOpen} color="red">
                  <Icon as={IconTrash} mr="3" />
                  Delete
               </MenuItem>
            </MenuList>
         </Menu>
         <ConfirmDeleteHabit
            alertDialog={alertDialog}
            deleteHabitId={habit.id}
            deleteHabitName={habit.name}
         />
      </>
   );
}
