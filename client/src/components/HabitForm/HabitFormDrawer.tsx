import {
   Button,
   ButtonGroup,
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   useToast,
} from '@chakra-ui/react';
import { useId, useState } from 'react';
import { Habit } from '@api';

import HabitForm from './HabitForm';
import { HabitsService } from '@api';
import { FormState } from './types';

type HabitFormDrawerProps = {
   isDrawerOpen: boolean;
   onCloseDrawer: () => void;
   editHabitDetails?: Habit;
};

export default function HabitFormDrawer({
   isDrawerOpen,
   onCloseDrawer,
   editHabitDetails,
}: HabitFormDrawerProps) {
   const formId = useId();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const isCreatingHabit = !editHabitDetails;
   const toast = useToast();

   const handleSubmit = async (formState: FormState) => {
      if (isCreatingHabit) {
         const { repeatSchedule, errors, ...rest } = formState;
         const newHabit = {
            ...rest,
            repeatDays: repeatSchedule.days,
         };

         setIsSubmitting(true);
         try {
            await HabitsService.createHabit(newHabit);

            toast({
               title: 'Create Habit',
               description: 'Habit successfully created!',
               status: 'success',
               duration: 5000,
               isClosable: true,
            });
         } catch (err) {
            console.log(err);
            toast({
               title: 'Failed to create habit',
               description: 'Something has gone wrong, please try again later',
               status: 'error',
               isClosable: true,
            });
         } finally {
            setIsSubmitting(false);
         }
      }
   };
   return (
      <Drawer
         isOpen={isDrawerOpen}
         onClose={onCloseDrawer}
         placement="right"
         size="md"
      >
         <DrawerOverlay />
         <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
               {isCreatingHabit ? 'Create' : 'Edit'} Habit
            </DrawerHeader>
            <DrawerBody>
               <HabitForm
                  formId={formId}
                  onSubmit={handleSubmit}
                  editHabitDetails={editHabitDetails}
               />
            </DrawerBody>
            <DrawerFooter>
               <ButtonGroup>
                  <Button variant="outline">Cancel</Button>
                  <Button
                     isLoading={isSubmitting}
                     type="submit"
                     form={formId}
                     variant="solid"
                     colorScheme="green"
                  >
                     Save {isCreatingHabit ? 'Habit' : 'Changes'}
                  </Button>
               </ButtonGroup>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   );
}
