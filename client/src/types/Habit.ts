export type Habit = {
   id: string;
   name: string;
   category?: string;
   description?: string;
   trackingStartDate: Date;
   repeatDays: string[];
};

export type CreatableHabit = Omit<Habit, 'id'>;
export type EditableHabit = Pick<Habit, 'id'> & Partial<CreatableHabit>;
