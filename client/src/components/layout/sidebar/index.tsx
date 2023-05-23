import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    HStack,
    Icon,
    IconButton,
    Link,
    List,
    ListIcon,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react'
import {
    IconCalendarEvent,
    IconFolder,
    IconLayoutDashboard,
    IconLogout,
    IconSeeding,
} from '@tabler/icons-react'

import CreateOrEditHabit from 'components/CreateOrEditHabit'
// import { logout } from 'lib/auth'
import { HabitTodo } from 'pages/today'
import { useContext, useState } from 'react'
import { Link as WouterLink } from 'wouter'
import { Habit } from 'types/Habit'
import { AuthContext } from 'src/App'
import authAPI from 'src/api/authAPI'

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
        getStat: (data: SidebarProps) =>
            `${data.todayHabitTodos.reduce(
                (num, todo) => (todo.isComplete ? num + 1 : num),
                0
            )}/${data.todayHabitTodos.length}`,
    },
    {
        to: 'habits',
        icon: IconFolder,
        displayName: 'habits',
        getStat: (data: SidebarProps) => data.habits.length,
    },
]

type SidebarProps = {
    habits: Habit[]
    todayHabitTodos: HabitTodo[]
} & ConditionalSidebarProps

type ConditionalSidebarProps =
    | {
          isMobile?: false
          onClose?: never
      }
    | {
          isMobile: true
          onClose: () => void
      }

export default function Sidebar(props: SidebarProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const auth = useContext(AuthContext)
    return (
        <Card
            as="aside"
            display={[props.isMobile ? 'flex' : 'none', null, 'flex']}
            w={props.isMobile ? 'full' : '250px'}
            h="full"
            //     variant={props.isMobile && 'unstyled'}
            bgColor="white"
            borderColor="gray.200"
            overflow="hidden"
        >
            <HStack spacing="3" py="3">
                <Icon as={IconSeeding} color="green.300" w="12" h="12" />
                <Text fontSize="xl" fontWeight="bold">
                    Habiteer
                </Text>
            </HStack>
            <Divider orientation="horizontal" mt="3" />
            <Box as="nav" flex="1">
                <List>
                    {links.map((link) => (
                        <ListItem>
                            <Link
                                onClick={props.onClose}
                                display="flex"
                                alignItems="center"
                                gap="2"
                                textTransform="capitalize"
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
                                <ListIcon as={link.icon} fontSize="lg" />
                                {link.displayName}
                                <Box
                                    ml="auto"
                                    as="span"
                                    bg="gray.100"
                                    rounded="full"
                                    color="gray.500"
                                    paddingX="2"
                                >
                                    {link.getStat?.(props)}
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
            <CreateOrEditHabit
                isDrawerOpen={isDrawerOpen}
                onCloseDrawer={() => setIsDrawerOpen(false)}
            />
            <Divider orientation="horizontal" mt="3" />
            <HStack mx="auto" my="3">
                <Avatar p="3" name={'Navdeep Dhamu'} />
                <Text>{'Navdeep Dhamu'}</Text>
                <Menu>
                    <MenuButton as={IconButton} icon={<ChevronDownIcon />}>
                        menu button
                    </MenuButton>
                    <MenuList>
                        <MenuItem
                            onClick={() => {
                                authAPI.logout(() => auth?.updateUser(null))
                            }}
                            icon={
                                <Icon
                                    as={IconLogout}
                                    color="red.500"
                                    boxSize="6"
                                />
                            }
                        >
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Card>
    )
}
