import {
   Box,
   Button,
   FormControl,
   FormLabel,
   Input,
   Select,
} from '@chakra-ui/react';

export default function SignupForm() {
   return (
      <Box as="form" display="flex" flexDirection="column" gap="4" noValidate>
         <FormControl>
            <FormLabel>Name</FormLabel>
            <Input />
         </FormControl>
         <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input />
         </FormControl>
         <FormControl isRequired>
            <FormLabel>Timezone</FormLabel>
            <Select placeholder="Select option">
               {Intl.supportedValuesOf('timeZone').map((tz) => (
                  <option value="tz">{tz}</option>
               ))}
            </Select>
         </FormControl>
         <FormControl isRequired>
            <FormLabel>Choose Password</FormLabel>
            <Input type="password" />
         </FormControl>
         <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" />
         </FormControl>
         <Button colorScheme="teal">Signup</Button>
      </Box>
   );
}
