import { ChevronDownIcon } from '@chakra-ui/icons';
import {
   Avatar,
   HStack,
   Icon,
   IconButton,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Text,
} from '@chakra-ui/react';
import { IconLogout } from '@tabler/icons-react';
import { useAuthContext } from 'context/AuthContext';

export default function User() {
   const { user, logoutUser } = useAuthContext();

   return (
      <HStack mx="auto" my="3">
         <Avatar p="3" name="Test User" />
         <Text>{user?.name || user?.email}</Text>
         <Menu>
            <MenuButton as={IconButton} icon={<ChevronDownIcon />}>
               menu button
            </MenuButton>
            <MenuList>
               <MenuItem
                  onClick={logoutUser}
                  icon={<Icon as={IconLogout} color="red.500" boxSize="6" />}
               >
                  Logout
               </MenuItem>
            </MenuList>
         </Menu>
      </HStack>
   );
}
