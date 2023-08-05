import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
   Box,
   Button,
   Flex,
   HStack,
   Heading,
   IconButton,
   Text,
} from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';

type Props = { date: Dayjs; onDateChange: (date: Dayjs) => void };

export default function Header({ date, onDateChange }: Props) {
   const isDateToday = date.isSame(dayjs(), 'date');
   const isDateYesterday = date.isSame(dayjs().subtract(1, 'days'), 'date');

   const handleLeftArrowClick = () => onDateChange(date.subtract(1, 'day'));
   const handleRightArrowClick = () => onDateChange(date.add(1, 'day'));

   return (
      <Box>
         {/* <HStack> */}
         <Flex justifyContent="space-between">
            <Box>
               <Heading
                  textTransform="capitalize"
                  color="gray.800"
                  fontWeight="bold"
               >
                  {isDateToday ? 'Today' : isDateYesterday ? 'Yesterday' : null}
               </Heading>
               <Text>{date.format('dddd, MMMM DD YYYY')}</Text>
            </Box>
            <HStack justifyContent="end" borderRadius="full">
               {!isDateToday && (
                  <Button onClick={() => onDateChange(dayjs())}>
                     Go to today
                  </Button>
               )}
               <IconButton
                  variant="ghost"
                  aria-label="previous day"
                  icon={<ChevronLeftIcon boxSize="7" />}
                  onClick={handleLeftArrowClick}
               />
               <IconButton
                  variant="ghost"
                  isDisabled={isDateToday}
                  aria-label="next day"
                  icon={<ChevronRightIcon boxSize="7" />}
                  onClick={handleRightArrowClick}
               />
            </HStack>
         </Flex>
         {/* </HStack> */}
      </Box>
   );
}
