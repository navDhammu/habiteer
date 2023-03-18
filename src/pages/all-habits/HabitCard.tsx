import {
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Heading,
	Card,
	Flex,
	CardHeader,
	Tag,
	Badge,
	CardBody,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogBody,
	AlertDialogHeader,
	AlertDialogFooter,
	Button,
	Box,
	useToast,
} from '@chakra-ui/react';

import { Icon } from '@chakra-ui/icons';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons';
import { Habit } from 'components/layout/AppLayout';
import { useRef, useState } from 'react';
import CreateOrEditHabit from 'components/CreateOrEditHabit';
import { deleteHabit } from 'services/dbOperations';

export default function HabitCard(props: Habit) {
	const [isEditingHabit, setIsEditingHabit] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const cancelRef = useRef();
	const toast = useToast();

	const closeDeleteDialogue = () => setIsDeleteDialogOpen(false);

	const handleDelete = () =>
		deleteHabit(props.id).then(() => {
			closeDeleteDialogue();
			toast({
				description: `Deleted habit ${props.name}`,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		});

	return (
		<>
			<CreateOrEditHabit
				mode='EDIT'
				isDrawerOpen={isEditingHabit}
				initialValues={{ ...props }}
				habitId={props.id}
				onCloseDrawer={() => setIsEditingHabit(false)}
			/>
			<AlertDialog
				isOpen={isDeleteDialogOpen}
				leastDestructiveRef={cancelRef}
				onClose={closeDeleteDialogue}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Habit
						</AlertDialogHeader>
						<AlertDialogBody>
							Are you sure you want to delete habit{' '}
							<Box as='em' bg='gray.200' p='1'>
								{props.name}
							</Box>{' '}
							? This cannot be undone.
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button
								onClick={closeDeleteDialogue}
								ref={cancelRef}>
								Cancel
							</Button>
							<Button
								colorScheme='red'
								onClick={handleDelete}
								ml={3}>
								Delete Habit
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
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
								<Icon as={IconEdit} mr='3' />
								Edit
							</MenuItem>
							<MenuItem
								onClick={() => setIsDeleteDialogOpen(true)}
								color='red'>
								<Icon as={IconTrash} mr='3' />
								Delete
							</MenuItem>
						</MenuList>
					</Menu>
				</CardHeader>
				<CardBody fontSize='sm'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Voluptas in sapiente deserunt, facere laboriosam soluta
					accusamus.
				</CardBody>
			</Card>
		</>
	);
}
