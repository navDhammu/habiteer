import {
   CalendarIcon,
   ChevronLeftIcon,
   ChevronRightIcon,
} from '@chakra-ui/icons';
import {
   Box,
   Button,
   ButtonGroup,
   Flex,
   Heading,
   IconButton,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverTrigger,
   Portal,
   Text,
   useDisclosure,
} from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import Calendar from './Calendar';

dayjs.extend(calendar);

type CompletionsHeaderProps = {
   date: Dayjs;
   onDateChange: (date: Dayjs) => void;
};

export default function CompletionsHeader({
   date,
   onDateChange,
}: CompletionsHeaderProps) {
   const { isOpen, onToggle, onClose } = useDisclosure();

   const isDateToday = date.isSame(dayjs(), 'date');
   const handleLeftArrowClick = () => onDateChange(date.subtract(1, 'day'));
   const handleRightArrowClick = () => onDateChange(date.add(1, 'day'));

   return (
      <>
         <Flex justifyContent="space-between" gap="4">
            <Box>
               <Heading
                  textTransform="capitalize"
                  color="gray.800"
                  fontWeight="bold"
                  size="lg"
               >
                  {date.calendar(null, {
                     sameDay: '[Today]',
                     nextDay: '[Tomorrow]',
                     nextWeek: '[Next] dddd',
                     lastDay: '[Yesterday]',
                     lastWeek: '[Last] dddd',
                  })}
               </Heading>
               <Text>{date.format('ddd MMM MM, YYYY')}</Text>
            </Box>
            <ButtonGroup variant="outline" isAttached>
               <Popover isOpen={isOpen} onClose={onClose}>
                  <PopoverTrigger>
                     <IconButton
                        icon={<CalendarIcon />}
                        aria-label="calendar"
                        onClick={onToggle}
                     />
                  </PopoverTrigger>
                  <Portal>
                     <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                           {/* <Input type="date" /> */}
                           <Calendar
                              date={date.toDate()}
                              selected={date.toDate()}
                              onDateSelected={(date) => {
                                 onDateChange(dayjs(date.date));
                                 onClose();
                              }}
                           />
                        </PopoverBody>
                     </PopoverContent>
                  </Portal>
               </Popover>
               <IconButton
                  aria-label="previous day"
                  icon={<ChevronLeftIcon boxSize="7" />}
                  onClick={handleLeftArrowClick}
               />
               <IconButton
                  aria-label="next day"
                  icon={<ChevronRightIcon boxSize="7" />}
                  onClick={handleRightArrowClick}
               />
               {!isDateToday && (
                  <Button onClick={() => onDateChange(dayjs())}>Today</Button>
               )}
            </ButtonGroup>
         </Flex>
      </>
   );
}
