import { Button, Spinner } from '@chakra-ui/react';
import { IconLogout } from '@tabler/icons-react';
import { useAuthContext } from 'context/AuthContext';

export default function SidebarLogout() {
   const { logoutUser, isLoading } = useAuthContext();

   return (
      <Button
         variant="link"
         leftIcon={isLoading ? <Spinner /> : <IconLogout />}
         onClick={logoutUser}
      >
         Logout
      </Button>
   );
}
