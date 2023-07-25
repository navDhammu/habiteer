import { render, screen } from '@testing-library/react';
import { HabitTodo } from '.';
import { HabitTodos } from './HabitTodos';

const createMockTodos = (n: number) => {
   return Array.from(
      { length: n },
      (_, i): HabitTodo => ({
         id: i.toString(),
         isComplete: [true, false][Math.floor(Math.random() * 2)],
         name: `habit ${i}`,
      })
   );
};

describe('HabitTodos', () => {
   test('renders habit todos correctly', () => {
      const numTodos = 3;
      const mockTodos = createMockTodos(numTodos);
      const mockOnCheckHabit = vi.fn();
      render(
         <HabitTodos
            heading="Habit checklist"
            todos={mockTodos}
            onCheckHabit={mockOnCheckHabit}
         />
      );
      expect(mockOnCheckHabit).toHaveBeenCalledTimes(numTodos);
      mockTodos.forEach((todo) => {
         const checkbox = screen.getByLabelText(todo.name);
         expect(checkbox);
         todo.isComplete
            ? expect(checkbox).toBeChecked()
            : expect(checkbox).not.toBeChecked();
         expect(mockOnCheckHabit).toHaveBeenCalledWith(todo.id);
      });
   });
});
