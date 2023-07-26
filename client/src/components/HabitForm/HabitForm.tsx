import {
   Box,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   Radio,
   Textarea,
   RadioGroup,
   Text,
   UseCheckboxGroupProps,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useReducer } from 'react';
import { Habit } from '@api';
import { initializeState } from './reducer.ts';
import React from 'react';
import WeekdayCheckboxes from './WeekdayCheckboxes.tsx';
import reducer from './reducer';
import { validateForm } from './validation.ts';
import { FormState, TextInputKey } from './types.ts';

type HabitFormProps = {
   formId: string;
   onSubmit: (data: FormState) => void;
   editHabitDetails?: Habit;
};

export default function HabitForm({
   formId,
   editHabitDetails,
   onSubmit,
}: HabitFormProps) {
   const [formState, dispatch] = useReducer(
      reducer,
      editHabitDetails!,
      initializeState
   );

   const handleTextInput =
      (key: TextInputKey) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
         dispatch({ type: key, payload: e.target.value });

   const handleFrequencyChange = (
      value: FormState['repeatSchedule']['frequency']
   ) => dispatch({ type: 'frequency', payload: value });

   const handleDaysChange: UseCheckboxGroupProps['onChange'] = (value) => {
      console.log(value);
      dispatch({ type: 'days', payload: value as Habit['repeatDays'] });
   };

   const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      const errors = validateForm(formState);
      if (Object.values(errors).some((value) => !!value)) {
         dispatch({ type: 'form_submit_error', payload: errors });
      } else {
         onSubmit(formState);
      }
   };

   return (
      <Box
         as="form"
         id={formId}
         onSubmit={handleFormSubmit}
         noValidate
         display="flex"
         flexDir="column"
         gap="4"
      >
         <FormControl isInvalid={!!formState.errors.name}>
            <FormLabel>Habit Name</FormLabel>
            <Input
               placeholder="eg. Read for 30 minutes"
               value={formState.name}
               onChange={handleTextInput('name')}
               isRequired
            />
            <FormErrorMessage>{formState.errors.name}</FormErrorMessage>
         </FormControl>
         <FormControl>
            <FormLabel>
               Habit Category
               <Text as="span" ml="2" fontSize="sm" color="gray.400">
                  optional
               </Text>
            </FormLabel>
            <Input
               placeholder="Choose Category"
               value={formState.category || ''}
               onChange={handleTextInput('category')}
            />
            <FormErrorMessage>{formState.errors.category} </FormErrorMessage>
         </FormControl>
         <FormControl>
            <FormLabel>
               Description{' '}
               <Text as="span" ml="2" fontSize="sm" color="gray.400">
                  optional
               </Text>
            </FormLabel>
            <Textarea
               value={formState.description}
               onChange={handleTextInput('description')}
            />
         </FormControl>
         <FormControl isInvalid={!!formState.errors.trackingStartDate}>
            <FormLabel>Start tracking from</FormLabel>
            <Input
               type="date"
               value={formState.trackingStartDate}
               onChange={handleTextInput('trackingStartDate')}
               min={format(new Date(), 'yyyy-MM-dd')}
               required
            />
            <FormErrorMessage>
               {formState.errors.trackingStartDate}
            </FormErrorMessage>
         </FormControl>

         <FormControl as="fieldset">
            <FormLabel as="legend">Repeat schedule</FormLabel>
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
         <FormControl
            as="fieldset"
            isInvalid={!!formState.errors.repeatSchedule}
         >
            <FormLabel as="legend">Select days:</FormLabel>
            <WeekdayCheckboxes
               value={formState.repeatSchedule.days}
               onChange={handleDaysChange}
            />
            <FormErrorMessage>
               {formState.errors.repeatSchedule}
            </FormErrorMessage>
         </FormControl>
      </Box>
   );
}
