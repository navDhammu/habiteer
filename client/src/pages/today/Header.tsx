import {
   ArrowRightIcon,
   ChevronLeftIcon,
   ChevronRightIcon,
} from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { isToday, isYesterday, subDays } from 'date-fns';
import addDays from 'date-fns/addDays';

type Props = { date: Date; onDateChange: (date: Date) => void };

export default function Header({ date, onDateChange }: Props) {
   const isDateToday = isToday(date);
   const isDateYesterday = isYesterday(date);

   const handleLeftArrowClick = () => onDateChange(subDays(date, 1));
   const handleRightArrowClick = () => onDateChange(addDays(date, 1));

   return (
      <Box>
         {/* <HStack> */}
         <Flex justifyContent="space-between">
            <Box>
               <Text
                  textTransform="uppercase"
                  color="gray.500"
                  fontWeight="bold"
                  fontSize="sm"
               >
                  {isDateToday ? 'Today' : isDateYesterday ? 'Yesterday' : null}
               </Text>
               <Text fontSize="lg" fontWeight="bold">
                  {date.toDateString()}
               </Text>
            </Box>
            <HStack justifyContent="end">
               {!isDateToday && (
                  <Button
                     onClick={() => onDateChange(new Date())}
                     rightIcon={<ArrowRightIcon boxSize="3" />}
                  >
                     Today
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
