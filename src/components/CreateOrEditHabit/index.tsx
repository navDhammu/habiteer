import {
   Button,
   Drawer,
   DrawerBody,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   useToast,
} from '@chakra-ui/react';
import { DocumentReference } from 'firebase/firestore';
import { useId, useState } from 'react';
import createHabit from 'services/createHabit';
import { HabitsDoc } from 'services/docTypes';
import editHabit from 'services/editHabit';
import HabitForm from './HabitForm';

export type ModeProps =
   | {
        mode: 'CREATE';
        initialValues?: never;
        habitId?: never;
     }
   | {
        mode: 'EDIT';
        initialValues: HabitsDoc;
        habitId: string;
     };

export type Props = {
   isDrawerOpen: boolean;
   onCloseDrawer: () => void;
} & ModeProps;

export default function CreateOrEditHabit({
   mode,
   isDrawerOpen,
   onCloseDrawer,
   initialValues,
   habitId,
}: Props) {
   const formId = useId();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const isEditMode = mode === 'EDIT';
   const toast = useToast();

   const handleSubmit = (data: Partial<HabitsDoc>) => {
      setIsSubmitting(true);
      let promise: Promise<void | DocumentReference>;
      promise = isEditMode ? editHabit(habitId, data) : createHabit(data);
      promise
         .then(() =>
            toast({
               title: `${isEditMode ? 'Edit' : 'Create'} Habit`,
               description: `habit successfully ${
                  isEditMode ? 'edited' : 'created'
               }`,
               status: 'success',
               duration: 5000,
               isClosable: true,
            })
         )
         .catch((e) => alert(e))
         .finally(() => {
            setIsSubmitting(false);
            onCloseDrawer();
         });
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
            <DrawerHeader borderBottomWidth="1px">
               {isEditMode ? 'Edit' : 'Create'} Habit
            </DrawerHeader>
            <DrawerBody>
               {isEditMode ? (
                  <HabitForm
                     id={formId}
                     mode={mode}
                     initialValues={initialValues}
                     onSubmit={handleSubmit}
                     habitId="hksdjfhg"
                  />
               ) : (
                  <HabitForm id={formId} mode={mode} onSubmit={handleSubmit} />
               )}
            </DrawerBody>
            <DrawerFooter>
               <Button
                  isLoading={isSubmitting}
                  type="submit"
                  form={formId}
                  variant="solid"
                  colorScheme="green"
               >
                  Save {isEditMode ? 'Changes' : 'Habit'}
               </Button>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   );
}
