import { signInWithEmailAndPassword } from '@firebase/auth';
import { Navigate } from 'react-router';
import { auth } from '../../services';
import LoginForm from './LoginForm';
import { ArrowRightIcon } from '@chakra-ui/icons';
import {
	Box,
	Heading,
	Container,
	Button,
	Center,
	Divider,
	Flex,
	Text,
	Icon,
	VStack,
	HStack,
} from '@chakra-ui/react';
import { IconSeeding } from '@tabler/icons';

export default function Login({ user }) {
	if (user) return <Navigate to='/dashboard' />;

	return (
		<Center h='100vh'>
			<Container>
				<VStack mb='4'>
					<HStack>
						<Icon
							as={IconSeeding}
							color='green.300'
							w='12'
							h='12'
						/>
						<Text fontSize='3xl' fontWeight='bold'>
							Habiteer
						</Text>
					</HStack>
					<Heading size='md'>Login to your account</Heading>
					<Box as='figure' textAlign='right' borderRadius='lg'>
						<Text as='q' fontStyle='italic'>
							Motivation is what gets you started. Habit is what
							keeps you going.
						</Text>
						<Text as='figcaption'>&mdash; Jim Ryun</Text>
					</Box>
				</VStack>
				<LoginForm />
				<Flex align='center'>
					<Divider />
					<Text padding='2'>OR</Text>
					<Divider />
				</Flex>
				<Center>
					<Button
						marginX='auto'
						colorScheme='green'
						variant='outline'
						rightIcon={<ArrowRightIcon />}
						onClick={() =>
							signInWithEmailAndPassword(
								auth,
								'test@test.com',
								'test1234'
							)
						}>
						Continue as test user
					</Button>
				</Center>
			</Container>
		</Center>
	);
}
