import { Completion } from '@api';
import {
   Card,
   CardBody,
   CardHeader,
   CardProps,
   StackDivider,
   VStack,
} from '@chakra-ui/react';
import { Dayjs } from 'dayjs';
import CompletionsHeader from './CompletionsHeader';
import CompletionsList from './CompletionsList';

export type CompletionsProps = {
   date: Dayjs;
   onDateChange: (date: Dayjs) => void;
   completionsList: Completion[];
   onCompletionStatusChange: (completion: Completion) => void;
};

export default function Completions({
   completionsList,
   onCompletionStatusChange,
   date,
   onDateChange,
}: CompletionsProps & CardProps) {
   return (
      <Card variant="outline">
         <CardHeader>
            <CompletionsHeader date={date} onDateChange={onDateChange} />
         </CardHeader>
         <CardBody
            as={VStack}
            w="full"
            pt="0"
            align="stretch"
            divider={<StackDivider />}
            spacing="4"
         >
            <CompletionsList
               completionsList={completionsList}
               onCompletionStatusChange={onCompletionStatusChange}
            />
         </CardBody>
      </Card>
   );
}
