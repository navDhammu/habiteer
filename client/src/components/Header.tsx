import { Box, HStack, Heading, Icon, List, ListItem } from '@chakra-ui/react';
import {
   IconCalendarEvent,
   IconChartBar,
   IconFolder,
   IconSeeding,
} from '@tabler/icons-react';
import CreateHabitButton from './CreateHabitButton';
import NavLink from './NavLink';
import UserMenu from './UserMenu';

export default function Header() {
   return (
      <Box
         px={[3, null, 6]}
         h="16"
         as="header"
         bg="white"
         display="flex"
         alignItems="center"
         justifyContent="space-between"
      >
         <HStack>
            <Icon as={IconSeeding} color="teal.300" w="12" h="12" />
            <Heading
               display={{ base: 'none', md: 'block' }}
               size="md"
               fontWeight="bold"
               textTransform="capitalize"
               color="teal.400"
            >
               Habiteer
            </Heading>
         </HStack>
         <Box as="nav" h="full">
            <List display="flex" h="full" gap="6">
               <ListItem>
                  <NavLink href="today" icon={IconCalendarEvent}>
                     Day
                  </NavLink>
               </ListItem>
               <ListItem>
                  <NavLink href="habits" icon={IconFolder}>
                     Habits
                  </NavLink>
               </ListItem>
               <ListItem>
                  <NavLink href="progress" icon={IconChartBar}>
                     Progress
                  </NavLink>
               </ListItem>
            </List>
         </Box>
         <HStack spacing={{ base: 2, md: 8 }}>
            <CreateHabitButton />
            <UserMenu />
         </HStack>
      </Box>
   );
}
