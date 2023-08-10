import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
   Box,
   Button,
   ButtonGroup,
   HStack,
   Heading,
   IconButton,
   Text,
} from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar);

type DayHeaderProps = { date: Dayjs; onDateChange: (date: Dayjs) => void };

export default function DayHeader({ date, onDateChange }: DayHeaderProps) {
   const isDateToday = date.isSame(dayjs(), 'date');
   // const isDateYesterday = date.isSame(dayjs().subtract(1, 'days'), 'date');

   const handleLeftArrowClick = () => onDateChange(date.subtract(1, 'day'));
   const handleRightArrowClick = () => onDateChange(date.add(1, 'day'));

   return (
      <Box>
         <HStack>
            <Heading
               textTransform="capitalize"
               color="gray.800"
               fontWeight="bold"
            >
               {date.calendar(null, {
                  sameDay: '[Today]',
                  nextDay: '[Tomorrow]',
                  nextWeek: '[Next] dddd',
                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd',
               })}
            </Heading>
            <ButtonGroup>
               <IconButton
                  aria-label="previous day"
                  icon={<ChevronLeftIcon boxSize="7" />}
                  onClick={handleLeftArrowClick}
               />
               <IconButton
                  isDisabled={isDateToday}
                  aria-label="next day"
                  icon={<ChevronRightIcon boxSize="7" />}
                  onClick={handleRightArrowClick}
               />
            </ButtonGroup>
            {!isDateToday && (
               <Button onClick={() => onDateChange(dayjs())}>Today</Button>
            )}
         </HStack>
         <Text fontStyle="italic" color="gray.600">
            {date.format('dddd, MMMM DD YYYY')}
         </Text>
      </Box>
   );
}
