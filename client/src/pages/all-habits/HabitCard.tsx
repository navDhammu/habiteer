import {
   Button,
   Card,
   CardBody,
   CardHeader,
   Flex,
   Heading,
   Tag,
   Text,
   CardFooter,
   HStack,
   Badge,
} from '@chakra-ui/react';

import { Icon } from '@chakra-ui/icons';
import { IconClock, IconCalendarRepeat } from '@tabler/icons-react';
import { Habit } from '@api';
import HabitCardMenuDropdown from './HabitCardMenuDropdown';
import { WorkInProgressPopover } from 'components/WorkInProgress';

export default function HabitCard(props: Habit) {
   return (
      <Card>
         <CardHeader as={Flex} alignItems="center">
            <HStack>
               <Heading size="sm">{props.name}</Heading>
               {props.category && <Tag>{props.category}</Tag>}
               <Badge variant="outline" colorScheme="green">
                  active
               </Badge>
            </HStack>
            <HabitCardMenuDropdown habit={props} />
         </CardHeader>
         <CardBody fontSize="sm" py="0">
            <Text fontSize="md">{props.description}</Text>
            <HStack>
               <Icon as={IconCalendarRepeat} boxSize={5} />
               <Text textTransform="capitalize">
                  {' '}
                  Repeat schedule:{' '}
                  {props.repeatDays.length === 7
                     ? 'Everyday'
                     : `Every ${props.repeatDays
                          .map((day) => day.slice(0, 3))
                          .join(', ')}`}
               </Text>
            </HStack>
            <HStack>
               <Icon as={IconClock} boxSize={5} />
               <Text size="sm"> Tracking since: {props.trackingStartDate}</Text>
            </HStack>
         </CardBody>
         <CardFooter alignItems="center">
            <WorkInProgressPopover
               trigger={
                  <Button ml="auto" variant="ghost" colorScheme="green">
                     See details
                  </Button>
               }
            />
         </CardFooter>
      </Card>
   );
}
