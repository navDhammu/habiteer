import {
   Box,
   Checkbox,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Heading,
   Icon,
   Input,
   InputGroup,
   InputLeftElement,
   Text,
   VStack,
   Wrap,
   WrapItem,
} from '@chakra-ui/react';
import { IconFolder } from '@tabler/icons';
import { format, formatISO, parseISO } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Habit } from 'types/Habit';
import { ModeProps } from './index';

const today = format(new Date(), 'yyyy-MM-dd');

type HabitFormProps = ModeProps & {
   formId: string;
   onSubmit: (data: FormValues) => void;
};

export type FormValues = Omit<Habit, 'id'>;

export default function HabitForm({
   mode,
   formId,
   initialValues,
   onSubmit,
}: HabitFormProps) {
   const [values, setValues] = useState<FormValues>(
      mode === 'EDIT'
         ? initialValues
         : {
              name: '',
              category: '',
              description: '',
              repeatDays: {
                 monday: true,
                 tuesday: true,
                 wednesday: true,
                 thursday: true,
                 friday: true,
                 saturday: true,
                 sunday: true,
              },
              trackingStartDate: Timestamp.fromDate(new Date()),
           }
   );
   const [errors, setErrors] = useState<{
      [Property in keyof FormValues]?: string;
   }>({});

   const handleChange =
      (key: keyof Habit) => (e: React.ChangeEvent<HTMLInputElement>) => {
         if (key === 'trackingStartDate') {
            setValues({
               ...values,
               [key]: Timestamp.fromDate(parseISO(e.target.value)),
            });
         } else if (key === 'repeatDays') {
            setValues({
               ...values,
               [key]: {
                  ...values.repeatDays,
                  [e.target.name]: e.target.checked,
               },
            });
         } else {
            setValues({ ...values, [key]: e.target.value });
         }
      };

   return (
      <Box
         as="form"
         id={formId}
         onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(values);
         }}
         noValidate
      >
         <VStack spacing="4" align="start">
            <Heading size="sm">
               1. {mode === 'CREATE' ? 'Choose' : 'Edit'} habit name and
               category
            </Heading>
            <FormControl isInvalid={!!errors.name}>
               <FormLabel>Habit Name</FormLabel>
               <Input
                  name="name"
                  placeholder="eg. Read for 30 minutes"
                  value={values.name}
                  onChange={handleChange('name')}
                  required
               />
               <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl>
               <FormLabel>
                  Habit Category
                  <Text as="span" ml="2" fontSize="sm" color="gray.400">
                     optional
                  </Text>
               </FormLabel>
               <InputGroup>
                  <InputLeftElement pointerEvents="none">
                     <Icon as={IconFolder} color="gray.400" />
                  </InputLeftElement>
                  <Input
                     name="category"
                     placeholder="Choose Category"
                     value={values.category}
                     onChange={handleChange('category')}
                  />
               </InputGroup>
            </FormControl>
         </VStack>
         <VStack spacing="4" align="start" mt="4">
            <Heading size="sm">
               2. {mode === 'CREATE' ? 'Create' : 'Edit'} habit repeat schedule
            </Heading>
            <FormControl isInvalid={!!errors.trackingStartDate}>
               <FormLabel>Start tracking from</FormLabel>
               <Input
                  type="date"
                  name="trackingStartDate"
                  disabled={mode === 'EDIT'}
                  value={formatISO(
                     values.trackingStartDate instanceof Timestamp
                        ? values.trackingStartDate.toDate()
                        : values.trackingStartDate,
                     { representation: 'date' }
                  )}
                  onChange={handleChange('trackingStartDate')}
                  min={today}
                  required
               />
               <FormErrorMessage>{errors.trackingStartDate}</FormErrorMessage>
            </FormControl>
            <FormControl as="fieldset" isInvalid={!!errors.repeatDays}>
               <FormLabel as="legend">Habit repeat schedule</FormLabel>
               <Wrap spacing="4">
                  {Object.keys(values.repeatDays).map((day) => (
                     <WrapItem key={day}>
                        <Checkbox
                           colorScheme="green"
                           name={day}
                           value={day}
                           isChecked={values.repeatDays[day]}
                           onChange={handleChange('repeatDays')}
                        >
                           {day}
                        </Checkbox>
                     </WrapItem>
                  ))}
               </Wrap>
               <FormErrorMessage>{errors.repeatDays}</FormErrorMessage>
            </FormControl>
         </VStack>
      </Box>
   );
}
