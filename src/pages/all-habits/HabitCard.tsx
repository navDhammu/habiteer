import {
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	List,
	ListItem,
	Heading,
	Container,
	Card,
	Flex,
	CardHeader,
	Tag,
	Badge,
	CardBody,
} from '@chakra-ui/react';

import { Icon } from '@chakra-ui/icons';
import { IconDots, IconEdit } from '@tabler/icons';
import { Habit } from 'components/layout/AppLayout';
import { useState } from 'react';
import CreateOrEditHabit from 'components/CreateOrEditHabit';

export default function HabitCard(props: Habit) {
	const [isEditingHabit, setIsEditingHabit] = useState(false);

	return (
		<Card>
			<CardHeader as={Flex} alignItems='flex-start'>
				<Heading size='sm'>{props.name}</Heading>
				<Tag>{props.category || 'Not Categorized'}</Tag>
				<Badge colorScheme='green'>active</Badge>
				<Menu>
					<MenuButton
						as={IconButton}
						ml='auto'
						aria-label='habit actions'
						icon={<IconDots />}
					/>
					<MenuList>
						<MenuItem onClick={() => setIsEditingHabit(true)}>
							<Icon as={IconEdit} mr='4' />
							edit
						</MenuItem>
					</MenuList>
				</Menu>
				<CreateOrEditHabit
					mode='EDIT'
					isDrawerOpen={isEditingHabit}
					initialValues={{ ...props }}
					habitId={props.id}
					onCloseDrawer={() => setIsEditingHabit(false)}
				/>
			</CardHeader>
			<CardBody fontSize='sm'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Voluptas in sapiente deserunt, facere laboriosam soluta
				accusamus.
			</CardBody>
		</Card>
	);
}
