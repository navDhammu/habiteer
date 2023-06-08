import { ChevronDownIcon } from '@chakra-ui/icons'
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
} from '@chakra-ui/react'
import { IconLogout } from '@tabler/icons-react'
import useAPIError from 'hooks/useAPIError'
import { useAuthContext } from 'context/AuthContext'
import authAPI from 'src/api/authAPI'

export default function User() {
    const { user, logoutUser } = useAuthContext()
    const handleAPIError = useAPIError()

    const handleLogoutClick = async () => {
        try {
            await authAPI.logout()
            logoutUser()
        } catch (error) {
            handleAPIError(error)
        }
    }
    return (
        <HStack mx="auto" my="3">
            <Avatar p="3" name={'Navdeep Dhamu'} />
            <Text>{user?.name || user?.email}</Text>
            <Menu>
                <MenuButton as={IconButton} icon={<ChevronDownIcon />}>
                    menu button
                </MenuButton>
                <MenuList>
                    <MenuItem
                        onClick={handleLogoutClick}
                        icon={
                            <Icon as={IconLogout} color="red.500" boxSize="6" />
                        }
                    >
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    )
}
