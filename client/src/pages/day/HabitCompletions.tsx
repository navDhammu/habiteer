import { Completion } from '@api';
import {
   Card,
   CardBody,
   CardHeader,
   CardProps,
   Heading,
   StackDivider,
   Text,
   VStack,
} from '@chakra-ui/react';
import HabitCompletion from './HabitCompletion';

type HabitCompletionsProps = {
   completionsList: Completion[];
   onCompletionStatusChange: (completion: Completion) => void;
};

export function HabitCompletions({
   completionsList,
   onCompletionStatusChange,
}: HabitCompletionsProps & CardProps) {
   if (!completionsList.length)
      return <Text>There are no habits scheduled for this date.</Text>;
   return (
      <Card>
         <CardHeader>
            <Heading size="md">Scheduled habits</Heading>
         </CardHeader>
         <CardBody
            as={VStack}
            align="stretch"
            divider={<StackDivider />}
            spacing="4"
         >
            {completionsList.map((item) => (
               <HabitCompletion
                  completion={item}
                  key={item.id}
                  onCompletionStatusChange={onCompletionStatusChange}
               />
            ))}
         </CardBody>
      </Card>
   );
}
