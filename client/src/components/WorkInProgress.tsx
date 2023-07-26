import {
   Popover,
   PopoverTrigger,
   PopoverContent,
   PopoverCloseButton,
   PopoverHeader,
   PopoverBody,
   Icon,
   Card,
   CardHeader,
   CardBody,
   Heading,
} from '@chakra-ui/react';
import { IconProgressAlert } from '@tabler/icons-react';
import { ReactNode } from 'react';

export default function WorkInProgress() {
   return (
      <Card>
         <CardHeader display="flex" alignItems="center" gap="4">
            <Icon as={IconProgressAlert} boxSize="10" color="orange.300" />
            <Heading size="md">Work In Progress</Heading>
         </CardHeader>
         <CardBody>
            This section is currently in development. Please check back soon!
         </CardBody>
      </Card>
   );
}

export function WorkInProgressPopover({ trigger }: { trigger: ReactNode }) {
   return (
      <Popover>
         <PopoverTrigger>{trigger}</PopoverTrigger>
         <PopoverContent>
            <PopoverCloseButton />
            <PopoverHeader
               display="flex"
               alignItems="center"
               gap="4"
               fontWeight="bold"
            >
               <Icon as={IconProgressAlert} boxSize="7" color="orange.400" />{' '}
               Work in progress
            </PopoverHeader>
            <PopoverBody>
               This feature is currently in development. Please check back soon!
            </PopoverBody>
         </PopoverContent>
      </Popover>
   );
}
