import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
   Badge,
   Box,
   Button,
   Card,
   CardBody,
   CardHeader,
   Flex,
   Heading,
   IconButton,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Tag,
   useDisclosure,
   useToast,
   Text,
} from '@chakra-ui/react';

import { Icon } from '@chakra-ui/icons';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import HabitFormDrawer from 'components/HabitForm/HabitFormDrawer';
import { useRef, useState } from 'react';
import { Habit } from 'types/Habit';

export default function HabitCard(props: Habit) {
   const {
      isOpen: isDeleteModalOpen,
      onOpen: onDeleModalOpen,
      onClose: onDeleteModalClose,
   } = useDisclosure();
   const {
      isOpen: isHabitFormOpen,
      onOpen: onHabitFormOpen,
      onClose: onHabitFormClose,
   } = useDisclosure();

   const cancelRef = useRef(null);
   const toast = useToast();

   const handleDelete = () =>
      Promise.resolve().then(() => {
         onDeleteModalClose();
         toast({
            description: `Deleted habit ${props.name}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
         });
      });

   return (
      <>
         <HabitFormDrawer
            isDrawerOpen={isHabitFormOpen}
            onCloseDrawer={onHabitFormClose}
            editHabitDetails={props}
         />
         <AlertDialog
            isOpen={isDeleteModalOpen}
            leastDestructiveRef={cancelRef}
            onClose={onDeleteModalClose}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                     Delete Habit
                  </AlertDialogHeader>
                  <AlertDialogBody>
                     Are you sure you want to delete habit{' '}
                     <Box as="em" bg="gray.200" p="1">
                        {props.name}
                     </Box>{' '}
                     ? This cannot be undone.
                  </AlertDialogBody>
                  <AlertDialogFooter>
                     <Button onClick={onDeleteModalClose} ref={cancelRef}>
                        Cancel
                     </Button>
                     <Button colorScheme="red" onClick={handleDelete} ml={3}>
                        Delete Habit
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
         <Card>
            <CardHeader as={Flex} alignItems="center" gap="2">
               <Heading size="sm">{props.name}</Heading>
               {props.category && <Tag>{props.category}</Tag>}
               <Menu>
                  <MenuButton
                     as={IconButton}
                     variant="ghost"
                     ml="auto"
                     aria-label="habit actions"
                     icon={<IconDots />}
                  />
                  <MenuList>
                     <MenuItem onClick={onHabitFormOpen}>
                        <Icon as={IconEdit} mr="3" />
                        Edit
                     </MenuItem>
                     <MenuItem onClick={onDeleModalOpen} color="red">
                        <Icon as={IconTrash} mr="3" />
                        Delete
                     </MenuItem>
                  </MenuList>
               </Menu>
            </CardHeader>
            <CardBody fontSize="sm">
               <Text>{props.description}</Text>
               <Text> Repeats every: {props.repeatDays.join(', ')}</Text>
               <Text> Tracking since: {props.trackingStartDate}</Text>
            </CardBody>
         </Card>
      </>
   );
}
