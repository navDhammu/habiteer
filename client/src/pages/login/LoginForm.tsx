import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from 'lib';
import { BiLogIn } from 'react-icons/bi';

import {
   Alert,
   AlertIcon,
   Button,
   Card,
   CardBody,
   FormControl,
   FormLabel,
   Input,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function LoginForm() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isLoginError, setIsLoginError] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value);
   const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
         .catch(() => setIsLoginError(true))
         .finally(() => setIsLoading(false));
   };

   return (
      <Card
         as="form"
         display="flex"
         flexDirection="column"
         gap="6"
         onSubmit={handleSubmit}
         //  onInvalid={handleInvalid}
      >
         <CardBody display="flex" flexDirection="column" gap="4">
            <FormControl>
               <FormLabel>Email</FormLabel>
               <Input
                  type="email"
                  value={email}
                  onChange={handleEmailInput}
                  placeholder="name@domain.com"
               />
            </FormControl>
            <FormControl>
               <FormLabel>Password</FormLabel>
               <Input
                  value={password}
                  onChange={handlePasswordInput}
                  type="password"
                  placeholder="atleast 8 characters"
               />
            </FormControl>
            {isLoginError && (
               <Alert status="error">
                  <AlertIcon />
                  Invalid username or password
               </Alert>
            )}
            <Button
               isLoading={isLoading}
               colorScheme="green"
               type="submit"
               disabled={isLoading}
               rightIcon={<BiLogIn />}
            >
               Login
            </Button>
         </CardBody>
      </Card>
   );
}
