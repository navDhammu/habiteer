import {
	IconCalendarEvent,
	IconFolder,
	IconLayoutDashboard,
	IconLogout,
	IconPlus,
	IconSeeding,
} from '@tabler/icons';
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import {
	Button,
	Box,
	Avatar,
	Flex,
	Text,
	Link,
	Divider,
	Icon,
	HStack,
	IconButton,
	List,
	ListIcon,
	ListItem,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { auth } from 'services';
import { logout } from 'services/auth';

const links = [
	{
		to: '/dashboard',
		icon: IconLayoutDashboard,
		displayName: 'dashboard',
	},
	{
		to: '/today',
		icon: IconCalendarEvent,
		displayName: 'today',
	},
	{
		to: '/all-habits',
		icon: IconFolder,
		displayName: 'habits',
	},
];

export default function Sidebar() {
	return (
		<Flex
			as='aside'
			w={[0, 1 / 5]}
			direction='column'
			borderColor='gray.300'
			bgColor='gray.100'
			overflow='hidden'>
			<HStack
				spacing='3'
				borderBottom='1px'
				borderColor='gray.300'
				py='3'>
				<Icon as={IconSeeding} color='green.400' w='12' h='12' />
				<Text fontSize='xl' fontWeight='bold'>
					Habiteer
				</Text>
			</HStack>
			<Box as='nav' flex='1'>
				<List>
					{links.map((link) => (
						<ListItem display='flex' alignItems='center'>
							<Link
								flex='1'
								gap='2'
								as={NavLink}
								_activeLink={{
									bg: 'gray.200',
									color: 'green.500',
									fontWeight: 'bold',
									borderLeft: '4px',
									borderLeftColor: 'green.500',
								}}
								p='2'
								to={link.to}>
								<ListIcon as={link.icon} fontSize='lg' />
								{link.displayName}
							</Link>
						</ListItem>
					))}
				</List>
			</Box>
			<Button
				w='80%'
				alignSelf='center'
				colorScheme='green'
				leftIcon={<AddIcon />}>
				Create Habit
			</Button>
			<Divider orientation='horizontal' mt='3' />
			<HStack mx='auto' my='3'>
				<Avatar
					p='3'
					name={auth.currentUser.displayName || 'Navdeep Dhamu'}
				/>
				<Text>{auth.currentUser.displayName || 'Navdeep Dhamu'}</Text>
				<Menu>
					<MenuButton as={IconButton} icon={<ChevronDownIcon />}>
						menu button
					</MenuButton>
					<MenuList>
						<MenuItem
							onClick={logout}
							icon={
								<Icon
									as={IconLogout}
									color='red.500'
									boxSize='6'
								/>
							}>
							Logout
						</MenuItem>
					</MenuList>
				</Menu>
			</HStack>
		</Flex>
	);
}
