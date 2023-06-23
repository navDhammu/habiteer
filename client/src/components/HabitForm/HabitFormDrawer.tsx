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
import { Habit } from 'types/Habit';

import HabitForm, { FormState } from './HabitForm';

type HabitFormDrawerProps = {
   isDrawerOpen: boolean;
   onCloseDrawer: () => void;
   initialValues?: Habit;
};

export default function HabitFormDrawer({
   isDrawerOpen,
   onCloseDrawer,
   initialValues,
}: HabitFormDrawerProps) {
   const formId = useId();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const isEditMode = !!initialValues;
   const toast = useToast();

   const handleSubmit = (data: FormState) => {
      setIsSubmitting(true);
      let promise = Promise.resolve();
      promise
         .then(() =>
            toast({
               title: `${isEditMode ? 'Edit' : 'Create'} Habit`,
               description: `habit successfully ${isEditMode ? 'edited' : 'created'}`,
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
      <Drawer isOpen={isDrawerOpen} onClose={onCloseDrawer} placement="right" size="md">
         <DrawerOverlay />
         <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
               {isEditMode ? 'Edit' : 'Create'} Habit
            </DrawerHeader>
            <DrawerBody>
               <HabitForm formId={formId} onSubmit={handleSubmit} initialValues={initialValues} />
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
                     Save {isEditMode ? 'Changes' : 'Habit'}
                  </Button>
               </ButtonGroup>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   );
}
