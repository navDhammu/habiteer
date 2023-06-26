import { pool } from '../..';
import { getAllHabits as getAllHabitsQuery } from './habits.queries';

export async function getAllHabits(userId: number) {
   return getAllHabitsQuery.run({ userId }, pool);
}
