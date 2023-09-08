import {
   Box,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
   Center,
   Container,
   HStack,
   Heading,
   Icon,
   Link,
   Text,
} from '@chakra-ui/react';
import { IconSeeding } from '@tabler/icons-react';
import LoginForm from 'pages/login/LoginForm';
import SignupForm from 'pages/signup/SignupForm';

type AuthMode = 'login' | 'signup';

export default function AuthPageLayout({ mode }: { mode: AuthMode }) {
   const link = mode === 'login' ? 'signup' : 'login';

   return (
      <Center h="100vh">
         <Container>
            <HStack justifyContent="center" my="6">
               <Icon as={IconSeeding} color="green.300" w="12" h="12" />
               <Text fontSize="3xl" fontWeight="bold">
                  Habiteer
               </Text>
            </HStack>
            <Card>
               <CardHeader as={Heading}>
                  {mode === 'login' ? 'Login' : 'Signup'}{' '}
               </CardHeader>
               <CardBody>
                  {mode === 'login' ? <LoginForm /> : <SignupForm />}
               </CardBody>
               <CardFooter>
                  <Box>
                     {mode === 'login'
                        ? "Don't have an account?"
                        : 'Already have an account?'}
                     <Link
                        href={link}
                        color="blue.500"
                        textTransform="capitalize"
                        fontWeight="bold"
                     >
                        {' '}
                        {link}
                     </Link>
                  </Box>
               </CardFooter>
            </Card>
         </Container>
      </Center>
   );
}
