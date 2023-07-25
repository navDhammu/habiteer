import { AddIcon } from '@chakra-ui/icons';
import {
   Box,
   Button,
   Card,
   Divider,
   HStack,
   Icon,
   Link,
   List,
   ListIcon,
   ListItem,
   Text,
} from '@chakra-ui/react';
import {
   IconCalendarEvent,
   IconFolder,
   IconLayoutDashboard,
   IconSeeding,
} from '@tabler/icons-react';

import HabitFormDrawer from 'components/HabitForm/HabitFormDrawer';
import { useState } from 'react';
import { Link as WouterLink } from 'wouter';
import User from './User';
import { useHabitsContext } from 'context/HabitsContext';
import { Habit } from '@api';

const links = [
   {
      to: 'dashboard',
      icon: IconLayoutDashboard,
      displayName: 'dashboard',
   },
   {
      to: 'today',
      icon: IconCalendarEvent,
      displayName: 'today',
   },
   {
      to: 'habits',
      icon: IconFolder,
      displayName: 'habits',
      getStat: (habits: Habit[]) => habits.length || null,
   },
];

type SidebarProps =
   | {
        isMobile?: false;
        onClose?: never;
     }
   | {
        isMobile: true;
        onClose: () => void;
     };

export default function Sidebar(props: SidebarProps) {
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const { habits } = useHabitsContext();

   return (
      <Card
         as="aside"
         display={[props.isMobile ? 'flex' : 'none', null, 'flex']}
         w={props.isMobile ? 'full' : '250px'}
         h="full"
         borderColor="gray.200"
         overflow="hidden"
      >
         <HStack spacing="3" py="3">
            <Icon as={IconSeeding} color="green.300" w="12" h="12" />
            <Text fontSize="xl" fontWeight="bold" textTransform="uppercase">
               Habiteer
            </Text>
         </HStack>
         <Divider orientation="horizontal" mt="3" />
         <Box as="nav" flex="1" p="4">
            <List>
               {links.map((link) => (
                  <ListItem>
                     <Link
                        onClick={props.onClose}
                        display="flex"
                        alignItems="center"
                        gap="2"
                        fontSize={13}
                        color="gray.500"
                        textTransform="uppercase"
                        as={WouterLink}
                        _activeLink={{
                           bg: 'gray.100',
                           fontWeight: 'bold',
                           borderLeft: '4px',
                           borderLeftColor: 'green.500',
                           color: 'green.500',
                           py: '3',
                           '& > span': {
                              background: 'green.300',
                              color: 'white',
                              fontWeight: 'normal',
                           },
                           '& > svg': {
                              boxSize: '6',
                           },
                        }}
                        p="2"
                        to={link.to}
                     >
                        <ListIcon as={link.icon} fontSize="2xl" />
                        {link.displayName}
                        <Box
                           ml="auto"
                           as="span"
                           bg="gray.100"
                           rounded="full"
                           color="gray.500"
                           paddingX="2"
                        >
                           {link.getStat?.(habits)}
                        </Box>
                     </Link>
                  </ListItem>
               ))}
            </List>
         </Box>
         <Button
            onClick={() => setIsDrawerOpen(true)}
            w="80%"
            alignSelf="center"
            colorScheme="green"
            leftIcon={<AddIcon />}
         >
            Create Habit
         </Button>
         <HabitFormDrawer
            isDrawerOpen={isDrawerOpen}
            onCloseDrawer={() => setIsDrawerOpen(false)}
         />
         <Divider orientation="horizontal" mt="3" />
         <User />
      </Card>
   );
}
