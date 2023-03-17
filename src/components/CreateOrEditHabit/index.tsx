import { useState } from 'react';
import { createHabit, editHabit, HabitDetails } from 'services/dbOperations';
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	Button,
	DrawerOverlay,
} from '@chakra-ui/react';
import HabitForm from './HabitForm';
import { useId } from 'react';

export type ModeProps =
	| {
			mode: 'CREATE';
			initialValues?: never;
			habitId?: never;
	  }
	| {
			mode: 'EDIT';
			initialValues: HabitDetails;
			habitId: string;
	  };

export type Props = {
	isDrawerOpen: boolean;
	onCloseDrawer: () => void;
} & ModeProps;

export default function CreateOrEditHabit({
	mode,
	isDrawerOpen,
	onCloseDrawer,
	initialValues,
	habitId,
}: Props) {
	const formId = useId();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const isEditing = mode === 'EDIT';

	const handleSubmit = (data: Partial<HabitDetails>) => {
		setIsSubmitting(true);
		let promise: Promise<void>;
		promise = isEditing ? editHabit(habitId, data) : createHabit(data);
		promise.catch((e) => alert(e)).finally(() => setIsSubmitting(false));
	};

	return (
		<Drawer
			isOpen={isDrawerOpen}
			onClose={onCloseDrawer}
			placement='right'
			size='md'>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader borderBottomWidth='1px'>
					{isEditing ? 'Edit' : 'Create'} Habit
				</DrawerHeader>
				<DrawerBody>
					{isEditing ? (
						<HabitForm
							id={formId}
							mode={mode}
							initialValues={initialValues}
							onSubmit={handleSubmit}
							habitId='hksdjfhg'
						/>
					) : (
						<HabitForm
							id={formId}
							mode={mode}
							onSubmit={handleSubmit}
						/>
					)}
				</DrawerBody>
				<DrawerFooter>
					<Button
						isLoading={isSubmitting}
						type='submit'
						form={formId}
						variant='solid'
						colorScheme='green'>
						Save {isEditing ? 'Changes' : 'Habit'}
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}