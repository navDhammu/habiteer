import {
   Card,
   CardBody,
   CardHeader,
   CardProps,
   Checkbox,
   Heading,
   List,
   ListItem,
} from '@chakra-ui/react';
import { HabitTodo } from '.';

type HabitTodosProps = {
   heading: string;
   todos: HabitTodo[];
   onCheckHabit: (
      habitId: string
   ) => (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export function HabitTodos({
   heading,
   todos,
   onCheckHabit,
   ...cardProps
}: HabitTodosProps & CardProps) {
   if (!todos.length) return null;
   return (
      <Card {...cardProps}>
         <CardHeader as={Heading} size="sm">
            {heading}
         </CardHeader>
         <CardBody>
            <List>
               {todos
                  .sort((a, b) => a.name < b.name && -1)
                  .map(({ id, isComplete, name }) => (
                     <ListItem key={id}>
                        <Checkbox
                           isChecked={isComplete}
                           onChange={onCheckHabit(id)}
                        >
                           {name}
                        </Checkbox>
                     </ListItem>
                  ))}
            </List>
         </CardBody>
      </Card>
   );
}
