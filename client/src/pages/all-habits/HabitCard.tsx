import {
   Button,
   Card,
   CardBody,
   Flex,
   Heading,
   Tag,
   Text,
   HStack,
   Badge,
   Box,
} from '@chakra-ui/react';

import { Icon } from '@chakra-ui/icons';
import { IconClock, IconCalendarRepeat } from '@tabler/icons-react';
import { Habit } from '@api';
import HabitCardMenuDropdown from './HabitCardMenuDropdown';
import { WorkInProgressPopover } from 'components/WorkInProgress';

export default function HabitCard(props: Habit) {
   return (
      <Card size="sm">
         <CardBody fontSize="sm" py="0">
            <Flex>
               <HStack>
                  <Heading size="sm">{props.name}</Heading>
                  {props.category && <Tag>{props.category}</Tag>}
                  <Badge variant="outline" colorScheme="green">
                     active
                  </Badge>
               </HStack>
               <HabitCardMenuDropdown habit={props} />
            </Flex>
            <Text fontSize="md" color="gray.500" fontStyle="italic" my="1">
               {props.description}
            </Text>
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
            <Box float="right">
               <WorkInProgressPopover
                  trigger={
                     <Button ml="auto" variant="ghost" colorScheme="green">
                        See details
                     </Button>
                  }
               />
            </Box>
         </CardBody>
      </Card>
   );
}
