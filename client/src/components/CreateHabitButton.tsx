import { Button, IconButton, useDisclosure } from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons-react';
import HabitFormDrawer from './HabitForm/HabitFormDrawer';

export default function CreateHabitButton() {
   const { isOpen, onClose, onOpen } = useDisclosure();

   return (
      <>
         <IconButton
            onClick={onOpen}
            colorScheme="teal"
            justifyContent="center"
            icon={<IconPlus />}
            aria-label="create habit"
            display={{ base: 'flex', md: 'none' }}
         />
         <Button
            display={{ base: 'none', md: 'flex' }}
            onClick={onOpen}
            colorScheme="teal"
            leftIcon={<IconPlus />}
         >
            Create Habit
         </Button>
         <HabitFormDrawer isDrawerOpen={isOpen} onCloseDrawer={onClose} />
      </>
   );
}
