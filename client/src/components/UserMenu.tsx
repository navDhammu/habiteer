import { ChevronDownIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
   Avatar,
   Button,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
} from '@chakra-ui/react';
import { useAuthContext } from 'context/AuthContext';
import { Link } from 'wouter';

export default function UserMenu() {
   const { logoutUser } = useAuthContext();

   return (
      <Menu>
         <MenuButton
            as={Button}
            p="0"
            variant="ghost"
            rightIcon={<ChevronDownIcon />}
            display="flex"
            justifyContent="center"
            alignItems="center"
         >
            <Avatar size="sm" />
         </MenuButton>
         <MenuList p="0">
            <MenuItem
               as={Link}
               target="_blank"
               href="https://github.com/navDhammu/habiteer"
            >
               Github <ExternalLinkIcon ml="2" />
            </MenuItem>
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
         </MenuList>
      </Menu>
   );
}
