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
	Card,
} from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';
import { auth } from 'services';
import { logout } from 'services/auth';
import { useState } from 'react';
import CreateOrEditHabit from 'components/CreateOrEditHabit';
import { Habit } from '../AppLayout';
import { HabitTodo } from 'pages/today';

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
		getStat: (data: SidebarProps) =>
			`${data.todayHabitTodos.reduce(
				(num, todo) => (todo.isComplete ? num + 1 : num),
				0
			)}/${data.todayHabitTodos.length}`,
	},
	{
		to: '/all-habits',
		icon: IconFolder,
		displayName: 'habits',
		getStat: (data: SidebarProps) => data.habits.length,
	},
];

type SidebarProps = {
	habits: Habit[];
	todayHabitTodos: HabitTodo[];
};

export default function Sidebar(props: SidebarProps) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	return (
		<Card
			as='aside'
			w={[0, 1 / 5]}
			direction='column'
			bgColor='white'
			borderColor='gray.200'
			overflow='hidden'>
			<HStack spacing='3' py='3'>
				<Icon as={IconSeeding} color='green.300' w='12' h='12' />
				<Text fontSize='xl' fontWeight='bold'>
					Habiteer
				</Text>
			</HStack>
			<Divider orientation='horizontal' mt='3' />
			<Box as='nav' flex='1'>
				<List>
					{links.map((link) => (
						<ListItem>
							<Link
								display='flex'
								alignItems='center'
								gap='2'
								textTransform='capitalize'
								as={NavLink}
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
								p='2'
								to={link.to}>
								<ListIcon as={link.icon} fontSize='lg' />
								{link.displayName}
								<Box
									ml='auto'
									as='span'
									bg='gray.100'
									rounded='full'
									color='gray.500'
									paddingX='2'>
									{link.getStat?.(props)}
								</Box>
							</Link>
						</ListItem>
					))}
				</List>
			</Box>
			<Button
				onClick={() => setIsDrawerOpen(true)}
				w='80%'
				alignSelf='center'
				colorScheme='green'
				leftIcon={<AddIcon />}>
				Create Habit
			</Button>
			<CreateOrEditHabit
				mode='CREATE'
				isDrawerOpen={isDrawerOpen}
				onCloseDrawer={() => setIsDrawerOpen(false)}
			/>
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
		</Card>
	);
}
