import {
	List,
	ListItem,
	Card,
	CardHeader,
	CardBody,
	Heading,
	Container,
	Tag,
	Badge,
	HStack,
	Icon,
	IconButton,
	Flex,
} from '@chakra-ui/react';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { useOutletContext } from 'react-router';

export default function () {
	const habits = useOutletContext();

	return (
		<Container>
			<Heading size='md' mb='4'>
				All habits
			</Heading>
			<List display='flex' flexDirection='column' gap='4'>
				{habits.map((habit) => (
					<ListItem key={habit.id}>
						<Card>
							<CardHeader as={Flex} alignItems='flex-start'>
								<Heading size='sm'>{habit.habitName}</Heading>
								<Tag>
									{habit.habitCategory || 'Not Categorized'}
								</Tag>
								<Badge colorScheme='green'>active</Badge>
								<IconButton
									ml='auto'
									aria-label='habit actions'
									icon={<Icon as={DotsHorizontalIcon} />}
								/>
							</CardHeader>
							<CardBody fontSize='sm'>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Voluptas in sapiente deserunt,
								facere laboriosam soluta accusamus.
							</CardBody>
						</Card>
					</ListItem>
				))}
			</List>
		</Container>
	);
}
