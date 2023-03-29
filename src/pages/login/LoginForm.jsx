import { signInWithEmailAndPassword } from '@firebase/auth';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import useForm from 'hooks/useForm';
import { BiLogIn } from 'react-icons/bi';
import { auth } from 'services';
import { ArrowRightIcon } from '@chakra-ui/icons';

import {
   Button,
   Divider,
   Input,
   Alert,
   AlertIcon,
   Icon,
   InputGroup,
   Heading,
   FormControl,
   InputLeftAddon,
   FormLabel,
   Box,
   Flex,
   Text,
   Center,
   Card,
   CardBody,
} from '@chakra-ui/react';

export default function LoginForm() {
   const {
      data,
      errorCode,
      isSubmitting,
      handleChange,
      handleInvalid,
      handleSubmit,
   } = useForm({
      onSubmit: (data) =>
         signInWithEmailAndPassword(auth, data.email, data.password),
   });

   return (
      <Card
         as="form"
         display="flex"
         flexDirection="column"
         gap="6"
         onSubmit={handleSubmit}
         onInvalid={handleInvalid}
      >
         <CardBody display="flex" flexDirection="column" gap="4">
            <FormControl>
               <FormLabel>Email</FormLabel>
               <Input
                  type="email"
                  value={data.email || ''}
                  onChange={handleChange('email')}
                  placeholder="name@domain.com"
               />
            </FormControl>
            <FormControl>
               <FormLabel>Password</FormLabel>
               <Input
                  value={data.password || ''}
                  onChange={handleChange('password')}
                  type="password"
                  placeholder="atleast 8 characters"
               />
            </FormControl>
            {errorCode?.includes('auth') && (
               <Alert status="error">
                  <AlertIcon />
                  Invalid username or password
               </Alert>
            )}
            <Button
               isLoading={isSubmitting}
               colorScheme="green"
               type="submit"
               disabled={isSubmitting}
               IconRight={BiLogIn}
            >
               Login
            </Button>
         </CardBody>
      </Card>
   );
}
