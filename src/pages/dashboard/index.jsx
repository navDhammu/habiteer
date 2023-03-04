import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  VStack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  Heading,
  Container,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { format } from "date-fns";
import { getDocs, orderBy, query } from "@firebase/firestore";
import { datesCollection } from "services/firestoreReferences";

export default function Dashboard() {
  const habits = useOutletContext();
  const [chartData, setChartData] = useState([]);
  const [loadingChartData, setLoadingChartData] = useState(true);

  useEffect(() => {
    (async function getChartData() {
      const { docs } = await getDocs(query(datesCollection(), orderBy("date")));
      const chartData = docs.map((doc) => {
        const { date, ...rest } = doc.data();
        const habits = Object.values(rest);
        const completedHabits = habits.filter((habit) => habit.isComplete);
        return {
          x: date.toDate(),
          "Completion Rate": (completedHabits.length / habits.length) * 100,
        };
      });

      setChartData(chartData);
      setLoadingChartData(false);
    })();
  }, []);

  const totalCompletions = habits.reduce(
    (prev, curr) => prev + curr.completions,
    0
  );
  const totalCategories = new Set(habits.map((habit) => habit.habitCategory))
    .size;

  return (
    <Container maxW="container.lg">
      <Heading size="md">Dashboard</Heading>
      <Card w="max-content" my="6">
        <CardBody as={VStack} divider={<StackDivider />}>
          <Stat textAlign="center">
            <StatLabel>Habits</StatLabel>
            <StatNumber>{habits.length}</StatNumber>
          </Stat>
          <Stat textAlign="center">
            <StatLabel>Habit Completions</StatLabel>
            <StatNumber>{totalCompletions}</StatNumber>
          </Stat>
          <Stat textAlign="center">
            <StatLabel>Habit Categories</StatLabel>
            <StatNumber>{totalCategories}</StatNumber>
          </Stat>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Habit completion rate over time</CardHeader>
        {loadingChartData ? (
          "loading..."
        ) : (
          <CardBody>
            <ResponsiveContainer height={300}>
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  tickMargin={7}
                  angle={-15}
                  dataKey="x"
                  tickFormatter={(date) => format(date, "MMM dd")}
                />
                <YAxis tickFormatter={(y) => `${y}%`} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Completion Rate"
                  stroke="#8884d8"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        )}
      </Card>
    </Container>
  );
}
