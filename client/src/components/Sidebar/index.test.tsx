import { render, screen } from 'test-utils';
import Sidebar from '.';

const createMockHabits = (max: number) => {
   return Array.from({ length: Math.ceil(Math.random() * max) }, (v, i) => {
      return {
         id: `${i}`,
         name: `habit ${i}`,
         trackingStartDate: new Date(),
         category: `category ${i}`,
         description: `lorem ipsum ${i}`,
         repeatDays: {
            Monday: true,
            Tuesday: false,
            Wednesday: true,
            Thursday: true,
            Friday: true,
            Saturday: false,
            Sunday: false,
         },
      };
   });
};

describe('sidebar', () => {
   describe('when user has no habits', () => {
      test('does NOT display count beside "Habits" link', () => {
         render(<Sidebar />);
         const link = screen.getByRole('link', { name: /habits/ });
         expect(link).not.toHaveTextContent(/\d+/);
      });
   });
   describe('when user has 1 or more habits', () => {
      test('displays correct count beside "Habits" link', () => {
         const numHabits = Math.ceil(Math.random() * 20);
         const mockHabits = createMockHabits(numHabits);

         render(<Sidebar />);
         expect(screen.getByRole('link', { name: /habits/ })).toHaveTextContent(
            `${mockHabits.length}`
         );
      });
   });
});
