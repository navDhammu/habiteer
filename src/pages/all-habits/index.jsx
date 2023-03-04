import {
  List,
  ListItem,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Container,
  Tag,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { useOutletContext } from "react-router";

export default function () {
  const habits = useOutletContext();

  return (
    <Container>
      <Heading size="md" mb="4">
        All habits
      </Heading>
      <List display="flex" flexDirection="column" gap="4">
        {habits.map((habit) => (
          <ListItem key={habit.id}>
            <Card>
              <CardHeader as={HStack}>
                <Heading size="sm">{habit.habitName}</Heading>
                <Tag>{habit.habitCategory || "Not Categorized"}</Tag>
                <Badge colorScheme="green">active</Badge>
              </CardHeader>
              <CardBody fontSize="sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas in sapiente deserunt, facere laboriosam soluta
                accusamus.
              </CardBody>
            </Card>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
