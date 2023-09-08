import {
   Alert,
   AlertIcon,
   Box,
   Button,
   Checkbox,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
} from '@chakra-ui/react';
import { IconLogin } from '@tabler/icons-react';
import { useAuthContext } from 'context/AuthContext';
import { useState } from 'react';

const testCredentials = {
   email: 'test@email.com',
   password: 'qwerasdf',
   errors: {
      email: '',
      password: '',
   },
};

export default function LoginForm() {
   const [formData, setFormData] = useState(testCredentials);
   const { loginUser, error, isLoading } = useAuthContext();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const isFormValid = form.checkValidity();
      if (isFormValid) {
         loginUser(formData);
      }
   };

   const handleError = (key: 'email' | 'password', error: string) => {
      setFormData((prev) => {
         return {
            ...prev,
            errors: {
               ...prev.errors,
               [key]: error,
            },
         };
      });
   };

   const isEmailValid = !formData.errors.email;
   const isPasswordValid = !formData.errors.password;

   return (
      <Box
         as="form"
         display="flex"
         flexDirection="column"
         gap="6"
         noValidate
         onSubmit={handleSubmit}
      >
         <FormControl isInvalid={!isEmailValid}>
            <FormLabel>Email</FormLabel>
            <Input
               type="email"
               isRequired
               value={formData.email}
               onInvalid={(e) =>
                  handleError(
                     'email',
                     (e.target as HTMLInputElement).validationMessage
                  )
               }
               onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
               }
               placeholder="name@domain.com"
            />
            <FormErrorMessage>{formData.errors.email}</FormErrorMessage>
         </FormControl>
         <FormControl isInvalid={!isPasswordValid}>
            <FormLabel>Password</FormLabel>
            <Input
               value={formData.password}
               onInvalid={(e) =>
                  handleError(
                     'password',
                     (e.target as HTMLInputElement).validationMessage
                  )
               }
               isRequired
               onChange={(e) =>
                  setFormData({
                     ...formData,
                     password: e.target.value,
                  })
               }
               type="password"
               minLength={6}
               placeholder="atleast 8 characters"
            />
            <FormErrorMessage>{formData.errors.password}</FormErrorMessage>
         </FormControl>
         {error && (
            <Alert status="error">
               <AlertIcon />
               {error}
            </Alert>
         )}
         <Checkbox
            isChecked={
               formData.email === testCredentials.email &&
               formData.password === testCredentials.password
            }
            onChange={(e) =>
               setFormData(
                  e.target.checked
                     ? testCredentials
                     : {
                          email: '',
                          password: '',
                          errors: { email: '', password: '' },
                       }
               )
            }
         >
            Use test login credentials
         </Checkbox>
         <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            colorScheme="teal"
            rightIcon={<IconLogin />}
         >
            Login
         </Button>
      </Box>
   );
}
