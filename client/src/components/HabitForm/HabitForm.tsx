import {
   Box,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Icon,
   Input,
   InputGroup,
   InputLeftElement,
   Radio,
   RadioGroup,
   Text,
   VStack,
   UseCheckboxGroupProps,
} from '@chakra-ui/react';
import { IconFolder } from '@tabler/icons-react';
import { format, formatISO } from 'date-fns';
import { useReducer } from 'react';
import { Habit } from 'types/Habit';
import { WEEKDAYS } from 'utils/dates';
import React from 'react';
import WeekdayCheckboxes from './WeekdayCheckboxes.tsx';
import reducer from './reducer';

export type FormState = Omit<Habit, 'id'>;

export type TextInputKey = keyof Pick<
   FormState,
   'name' | 'category' | 'description' | 'trackingStartDate'
>;

type HabitFormProps = {
   formId: string;
   onSubmit: (data: FormState) => void;
   initialValues?: FormState;
};

export default function HabitForm({ formId, initialValues, onSubmit }: HabitFormProps) {
   const [formState, dispatch] = useReducer(reducer, initialValues, initializeState);

   const isEditMode = !!initialValues;

   const handleTextInput = (key: TextInputKey) => (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: key, payload: e.target.value });

   const handleFrequencyChange = (value: FormState['repeatSchedule']['frequency']) =>
      dispatch({ type: 'frequency', payload: value });

   const handleDaysChange: UseCheckboxGroupProps['onChange'] = (value) => {
      console.log(value);
      dispatch({ type: 'days', payload: value as string[] });
   };

   return (
      <Box
         as="form"
         id={formId}
         onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(formState);
         }}
         noValidate
      >
         <VStack spacing="4" align="start">
            <FormControl>
               <FormLabel fontSize="sm" color="gray.600" fontWeight="bold">
                  Habit Name
               </FormLabel>
               <Input
                  placeholder="eg. Read for 30 minutes"
                  value={formState.name}
                  onChange={handleTextInput('name')}
                  required
               />
               <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl>
               <FormLabel fontSize="sm" color="gray.600" fontWeight="bold">
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
                     placeholder="Choose Category"
                     value={formState.category}
                     onChange={handleTextInput('category')}
                  />
               </InputGroup>
            </FormControl>
         </VStack>
         <VStack spacing="4" align="start" mt="4">
            <FormControl>
               <FormLabel fontSize="sm" color="gray.600" fontWeight="bold">
                  Start tracking from
               </FormLabel>
               <Input
                  type="date"
                  disabled={isEditMode}
                  value={formatISO(formState.trackingStartDate, {
                     representation: 'date',
                  })}
                  onChange={handleTextInput('trackingStartDate')}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  required
               />
               <FormErrorMessage>{/* {errors.trackingStartDate} */}</FormErrorMessage>
            </FormControl>

            <FormControl as="fieldset">
               <FormLabel as="legend" fontSize="sm" color="gray.600" fontWeight="bold">
                  Repeat schedule
               </FormLabel>
               <RadioGroup
                  value={formState.repeatSchedule.frequency}
                  onChange={handleFrequencyChange}
                  colorScheme="green"
               >
                  <Radio value="daily" mr="2">
                     Daily
                  </Radio>
                  <Radio value="weekly">Weekly</Radio>
               </RadioGroup>
            </FormControl>

            <FormControl as="fieldset" isInvalid={!formState.repeatSchedule.days.length}>
               <FormLabel as="legend" fontSize="sm" color="gray.600" fontWeight="bold">
                  Select days:
               </FormLabel>
               <WeekdayCheckboxes
                  value={formState.repeatSchedule.days}
                  onChange={handleDaysChange}
               />
               <FormErrorMessage></FormErrorMessage>
            </FormControl>
         </VStack>
      </Box>
   );
}

function initializeState(initialValues: HabitFormProps['initialValues']) {
   return (
      initialValues ?? {
         name: '',
         category: '',
         description: '',
         repeatSchedule: { days: WEEKDAYS, frequency: 'daily' },
         trackingStartDate: new Date(),
      }
   );
}
