import {
   Box,
   Button,
   Card,
   Divider,
   Heading,
   Icon,
   Link,
   List,
   ListItem,
   VStack,
} from '@chakra-ui/react';
import {
   IconCalendarEvent,
   IconChartBar,
   IconExternalLink,
   IconFolder,
   IconPlus,
   IconSeeding,
} from '@tabler/icons-react';

import HabitFormDrawer from 'components/HabitForm/HabitFormDrawer';
import { useState } from 'react';
import { useHabitsContext } from 'context/HabitsContext';
import SidebarLink from './SidebarLink';
import SidebarLogout from './SidebarLogout';

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
         px="6"
      >
         <VStack>
            <Icon as={IconSeeding} color="green.300" w="12" h="12" />
            <Heading
               size="md"
               fontWeight="bold"
               textTransform="capitalize"
               color="gray.700"
            >
               Habiteer
            </Heading>
         </VStack>
         <Divider orientation="horizontal" mt="3" />
         <Box as="nav" flex="1" mx="-6">
            <List>
               <ListItem>
                  <SidebarLink to="today" icon={IconCalendarEvent}>
                     today
                  </SidebarLink>
               </ListItem>
               <ListItem>
                  <SidebarLink
                     to="habits"
                     icon={IconFolder}
                     stat={habits.length.toString()}
                  >
                     habits
                  </SidebarLink>
                  <ListItem>
                     <SidebarLink to="stats" icon={IconChartBar}>
                        Stats
                     </SidebarLink>
                  </ListItem>
               </ListItem>
            </List>
         </Box>
         <Button
            p="4"
            onClick={() => setIsDrawerOpen(true)}
            // alignSelf="center"
            colorScheme="teal"
            leftIcon={<IconPlus />}
         >
            Create New Habit
         </Button>
         {/* <User /> */}

         <Divider orientation="horizontal" mt="6" />
         <VStack align="flex-start" spacing={4} my="6" fontSize="sm">
            <Button
               as={Link}
               variant="link"
               leftIcon={<IconExternalLink />}
               href="https://github.com/navDhammu/habiteer/"
               target="_blank"
            >
               Github
            </Button>
            <SidebarLogout />
         </VStack>
         <HabitFormDrawer
            isDrawerOpen={isDrawerOpen}
            onCloseDrawer={() => setIsDrawerOpen(false)}
         />
      </Card>
   );
}
