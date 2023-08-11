import {
   Box,
   Button,
   ButtonGroup,
   Card,
   CardBody,
   HStack,
   IconButton,
   SimpleGrid,
   Text,
} from '@chakra-ui/react';
import {
   IconChevronLeft,
   IconChevronRight,
   IconChevronsLeft,
   IconChevronsRight,
} from '@tabler/icons-react';
import { Props, useDayzed } from 'dayzed';
import { useEffect, useState } from 'react';

const monthNamesShort = [
   'Jan',
   'Feb',
   'Mar',
   'Apr',
   'May',
   'Jun',
   'Jul',
   'Aug',
   'Sep',
   'Oct',
   'Nov',
   'Dec',
];

const weekdayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar(props: Props & { onJumpToToday: () => void }) {
   const [offset, setOffset] = useState(0);

   const { calendars, getBackProps, getForwardProps, getDateProps } = useDayzed(
      { ...props, offset, onOffsetChanged: (offset) => setOffset(offset) }
   );
   useEffect(() => {
      if (offset > 0) {
         setOffset(0);
      }
   }, [props.date]);

   if (calendars.length) {
      return (
         <Card w="full">
            {calendars.map((calendar) => (
               <CardBody key={`${calendar.month}${calendar.year}`}>
                  <Box textAlign="center">
                     <ButtonGroup
                        variant="outline"
                        display="flex"
                        size="sm"
                        justifyContent="space-between"
                        alignItems="center"
                     >
                        <HStack>
                           <IconButton
                              {...getBackProps({ calendars, offset: 12 })}
                              icon={<IconChevronsLeft />}
                              aria-label="Go back 1 year"
                           />
                           <IconButton
                              aria-label="Go back 1 month"
                              icon={<IconChevronLeft />}
                              {...getBackProps({ calendars })}
                           />
                        </HStack>
                        <Text size="lg" fontWeight="bold">
                           {monthNamesShort[calendar.month]} {calendar.year}
                        </Text>
                        <HStack>
                           <IconButton
                              aria-label="Go forward 1 month"
                              icon={<IconChevronRight />}
                              {...getForwardProps({ calendars })}
                           />
                           <IconButton
                              aria-label="Go forward 1 year"
                              icon={<IconChevronsRight />}
                              {...getForwardProps({ calendars, offset: 12 })}
                           />
                        </HStack>
                     </ButtonGroup>
                  </Box>
                  <SimpleGrid columns={7} justifyContent="center">
                     {weekdayNamesShort.map((weekday) => (
                        <Box
                           my="2"
                           fontSize="sm"
                           textAlign="center"
                           color="teal.400"
                           textTransform="uppercase"
                           key={`${calendar.month}${calendar.year}${weekday}`}
                        >
                           {weekday}
                        </Box>
                     ))}
                     {calendar.weeks.map((week, weekIndex) =>
                        week.map((dateObj, index) => {
                           let key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                           if (!dateObj) {
                              return (
                                 <div
                                    key={key}
                                    style={{
                                       display: 'inline-block',
                                       width: 'calc(100% / 7)',
                                       border: 'none',
                                       background: 'transparent',
                                    }}
                                 />
                              );
                           }
                           let { date, selected, selectable, today } = dateObj;
                           let background = today ? 'green.50' : '';
                           background = selected ? 'teal.500' : background;
                           background = !selectable ? 'teal' : background;
                           return (
                              <Button
                                 colorScheme="teal"
                                 color={selected ? 'white' : 'gray.500'}
                                 variant={selected ? 'solid' : 'ghost'}
                                 key={key}
                                 {...getDateProps({ dateObj })}
                              >
                                 {selectable ? date.getDate() : 'X'}
                              </Button>
                           );
                        })
                     )}
                  </SimpleGrid>
               </CardBody>
            ))}
         </Card>
      );
   }
   return null;
}
