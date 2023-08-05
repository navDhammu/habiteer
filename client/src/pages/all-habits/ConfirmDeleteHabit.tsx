import { Habit, HabitsService } from '@api';
import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
   Button,
   Highlight,
   UseDisclosureReturn,
   useToast,
} from '@chakra-ui/react';

import { useHabitsContext } from 'context/HabitsContext';
import { useRef, useState } from 'react';

type ConfirmDeleteHabitProps = {
   alertDialog: UseDisclosureReturn;
   deleteHabitId: Habit['id'];
   deleteHabitName: Habit['name'];
};

export default function ConfirmDeleteHabit({
   alertDialog,
   deleteHabitId,
   deleteHabitName,
}: ConfirmDeleteHabitProps) {
   const cancelRef = useRef(null);
   const { deleteHabit } = useHabitsContext();
   const [isDeletingHabit, setIsDeletingHabit] = useState(false);
   const toast = useToast();

   const handleDeleteClick = async () => {
      setIsDeletingHabit(true);
      try {
         await HabitsService.deleteHabit(deleteHabitId);
         deleteHabit(deleteHabitId);
         toast({
            title: 'Delete Habit',
            description: `Successfully deleted habit ${deleteHabitName}`,
            status: 'success',
            variant: 'top-accent',
            duration: 5000,
            isClosable: true,
         });
      } catch (error) {
         toast({
            title: 'Delete Habit',
            status: 'error',
            description: 'Unable to delete habit, something went wrong',
         });
      } finally {
         setIsDeletingHabit(false);
         alertDialog.onClose();
      }
   };

   return (
      <AlertDialog
         isOpen={alertDialog.isOpen}
         leastDestructiveRef={cancelRef}
         onClose={alertDialog.onClose}
      >
         <AlertDialogOverlay>
            <AlertDialogContent>
               <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Habit
               </AlertDialogHeader>
               <AlertDialogBody>
                  <Highlight
                     query={deleteHabitName}
                     styles={{
                        px: '1',
                        py: '1',
                        bg: 'orange.100',
                     }}
                  >
                     {`Are you sure you want to delete habit ${deleteHabitName}? All associated data with this habit will be permanently
                  removed.`}
                  </Highlight>
               </AlertDialogBody>
               <AlertDialogFooter>
                  <Button onClick={alertDialog.onClose} ref={cancelRef}>
                     Cancel
                  </Button>
                  <Button
                     colorScheme="red"
                     isLoading={isDeletingHabit}
                     isDisabled={isDeletingHabit}
                     onClick={handleDeleteClick}
                     ml={3}
                  >
                     Delete Habit
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogOverlay>
      </AlertDialog>
   );
}
