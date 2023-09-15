import { Completion, HabitsService } from '@api';
import { CheckIcon, SmallCloseIcon, TimeIcon } from '@chakra-ui/icons';
import {
   Badge,
   Button,
   ButtonGroup,
   HStack,
   Heading,
   ListItem,
   Tag,
   Text,
   useToast,
} from '@chakra-ui/react';
import { useHabitsContext } from 'context/HabitsContext';
import { useState } from 'react';

type CompletionsListItemProps = {
   completion: Completion;
   onCompletionStatusChange: (completion: Completion) => void;
};

export default function CompletionsListItem({
   completion,
   onCompletionStatusChange,
}: CompletionsListItemProps) {
   const [updatingStatus, setUpdatingStatus] = useState('');
   const { habits } = useHabitsContext();
   const toast = useToast();

   const habit = habits.find((habit) => habit.id === completion.habitId);

   const handleStatusBtnClick =
      (status: CompletionsListItemProps['completion']['completionStatus']) =>
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
      <ListItem
         p="1"
         my="2"
         borderColor={
            completionOptions[completion.completionStatus].borderColor
         }
      >
         <HStack flexWrap="wrap">
            {completionOptions[completion.completionStatus].icon}
            <Heading size="sm">{habit?.name}</Heading>
            <Badge
               variant="solid"
               colorScheme={
                  completionOptions[completion.completionStatus]
                     .badgeColorScheme
               }
            >
               {completion.completionStatus}
            </Badge>
            {habit?.category ? (
               <Tag textTransform="capitalize">{habit.category}</Tag>
            ) : null}
         </HStack>
         <Text fontStyle="italic" color="gray.500" my="1">
            {habit?.description}
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
      </ListItem>
   );
}
