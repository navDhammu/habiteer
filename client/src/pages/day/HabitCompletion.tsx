import { Completion, HabitsService } from '@api';
import { CheckIcon, SmallCloseIcon, TimeIcon } from '@chakra-ui/icons';
import {
   Badge,
   Box,
   Button,
   ButtonGroup,
   HStack,
   Heading,
   Tag,
   Text,
   useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

type HabitCompletionProps = {
   completion: Completion;
   onCompletionStatusChange: (completion: Completion) => void;
};

export default function HabitCompletion({
   completion,
   onCompletionStatusChange,
}: HabitCompletionProps) {
   const [updatingStatus, setUpdatingStatus] = useState('');
   const toast = useToast();

   const handleStatusBtnClick =
      (status: HabitCompletionProps['completion']['completionStatus']) =>
      async () => {
         setUpdatingStatus(status);
         try {
            const result = await HabitsService.updateCompletionStatus(
               completion.id,
               {
                  completionStatus: status,
               }
            );
            onCompletionStatusChange(result);
         } catch (error) {
            toast({
               status: 'error',
               description: `Unable to mark habit as ${status}`,
            });
         } finally {
            setUpdatingStatus('');
         }
      };

   const completionOptions = {
      pending: {
         icon: <TimeIcon color="gray.500" />,
         badgeColorScheme: 'gray',
         borderColor: 'gray.50',
      },
      complete: {
         icon: <CheckIcon color="green.500" />,
         badgeColorScheme: 'green',
         borderColor: 'green.50',
      },
      incomplete: {
         icon: <SmallCloseIcon color="red.400" />,
         badgeColorScheme: 'red',
         borderColor: 'red.50',
      },
   };

   return (
      <Box
         p="1"
         borderColor={
            completionOptions[completion.completionStatus].borderColor
         }
      >
         <HStack flexWrap="wrap">
            {completionOptions[completion.completionStatus].icon}
            <Heading size="sm">{completion.name}</Heading>
            <Badge
               variant="subtle"
               colorScheme={
                  completionOptions[completion.completionStatus]
                     .badgeColorScheme
               }
            >
               {completion.completionStatus}
            </Badge>
            {completion.category ? (
               <Tag textTransform="capitalize">{completion.category}</Tag>
            ) : null}
         </HStack>
         <Text fontStyle="italic" color="gray.500" my="1">
            {completion.description}
         </Text>
         <ButtonGroup
            size="sm"
            isAttached
            ml="auto"
            variant="outline"
            flexWrap="wrap"
         >
            <Button
               isLoading={updatingStatus === 'complete'}
               isDisabled={completion.completionStatus === 'complete'}
               onClick={handleStatusBtnClick('complete')}
            >
               Mark Complete
            </Button>
            <Button
               isLoading={updatingStatus === 'incomplete'}
               isDisabled={completion.completionStatus === 'incomplete'}
               onClick={handleStatusBtnClick('incomplete')}
            >
               Mark Incomplete
            </Button>
            <Button
               isLoading={updatingStatus === 'pending'}
               isDisabled={completion.completionStatus === 'pending'}
               onClick={handleStatusBtnClick('pending')}
            >
               Mark Pending
            </Button>
         </ButtonGroup>
      </Box>
   );
}
