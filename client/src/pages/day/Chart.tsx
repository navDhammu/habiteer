import { HabitsService } from '@api';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
   Box,
   Button,
   ButtonGroup,
   Card,
   CardBody,
   CardHeader,
   HStack,
   Heading,
   Skeleton,
   Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useEffect, useState } from 'react';
import {
   Bar,
   BarChart,
   Cell,
   LabelProps,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from 'recharts';
import { DAY_NAMES_SHORT } from 'src/constants';

dayjs.extend(weekOfYear);

const currentWeek = dayjs().week();

type Data = {
   name: string;
   completionRate: number | null;
   count: number;
}[];

export default function Chart() {
   const [week, setWeek] = useState(currentWeek);
   const [data, setData] = useState<Data>();
   const [isLoading, setIsLoading] = useState(false);

   const weekStartDate = dayjs().week(week).day(0);
   const weekEndDate = dayjs().week(week).day(6);

   useEffect(() => {
      setIsLoading(true);

      HabitsService.getCompletions(
         weekStartDate.format('YYYY-MM-DD'),
         weekEndDate.format('YYYY-MM-DD')
      )
         .then((completions) => {
            const initialData = DAY_NAMES_SHORT.map<Data[number]>(
               (dayName) => ({ name: dayName, completionRate: 0, count: 0 })
            );

            for (let { completionStatus, scheduledDate } of completions) {
               const index = dayjs(scheduledDate).day();
               const { name, completionRate, count } = initialData[index];
               initialData[index] = {
                  name,
                  completionRate:
                     (completionRate || 0) +
                     (completionStatus === 'complete' ? 100 : 0),
                  count: count + 1,
               };
            }

            initialData.forEach((dataPoint, _) =>
               dataPoint.count === 0
                  ? (dataPoint.completionRate = null)
                  : (dataPoint.completionRate! /= dataPoint.count)
            );

            setData(initialData);
         })
         .catch((err) => console.log(err))
         .finally(() => setIsLoading(false));
   }, [week]);

   const isCurrentWeek = week === currentWeek;

   return (
      <Card h="96">
         <CardHeader>
            <Heading size="sm">Completion Rate (%)</Heading>
            <HStack align="center">
               <Skeleton isLoaded={!isLoading}>
                  <Text fontWeight="bold" color="blackAlpha.600">
                     {weekStartDate.format('MMMM DD, YYYY')} -{' '}
                     {weekEndDate.format('MMMM DD, YYYY')}
                  </Text>
               </Skeleton>
               <Box textAlign="right">
                  <ButtonGroup
                     variant="outline"
                     isAttached
                     size="sm"
                     isDisabled={isLoading}
                  >
                     <Button
                        onClick={() => setWeek(week - 1)}
                        leftIcon={<ChevronLeftIcon />}
                     >
                        Prev week
                     </Button>
                     <Button
                        onClick={() => setWeek(week + 1)}
                        rightIcon={<ChevronRightIcon />}
                     >
                        Next week
                     </Button>
                  </ButtonGroup>
                  <Button
                     onClick={() => setWeek(dayjs().week())}
                     isDisabled={isCurrentWeek}
                     size="sm"
                     float="right"
                     variant="outline"
                  >
                     Jump to current week
                  </Button>
               </Box>
            </HStack>
         </CardHeader>
         <CardBody>
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data}>
                  <Tooltip content={<CustomTooltip />} />
                  <XAxis dataKey="name" />
                  <YAxis dataKey="completionRate" domain={[0, 100]} />
                  <Bar dataKey="completionRate" label={<CustomLabel />}>
                     {data?.map((_, i) => (
                        <Cell key={`cell-${i}`} fill="#ED8936" />
                     ))}
                  </Bar>
               </BarChart>
            </ResponsiveContainer>
         </CardBody>
      </Card>
   );
}

function CustomLabel(props: LabelProps) {
   if (props.value !== null) {
      // No label if there is a value. Let the cell handle it.
      return null;
   }

   return (
      <text
         x={props.x}
         y={props.y}
         dy={-10}
         dx={Number(props.width ?? 0) / 2}
         fill={props.stroke}
         fontSize={15}
         textAnchor="middle"
      >
         N/A
      </text>
   );
}

function CustomTooltip({ active, payload, label }: any) {
   if (active && payload && payload.length) {
      return (
         <Box bg="blackAlpha.600" p="4" color="white">
            <Text>{`${label} : ${Math.round(
               Number(payload[0].value)
            )} %`}</Text>
         </Box>
      );
   }
   return null;
}
