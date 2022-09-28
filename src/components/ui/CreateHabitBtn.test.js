import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { toISOFormat } from '../../../utils/dates';
import { weekDaysArray } from '../../../utils/days';
import GlobalModal from '../../Modals/GlobalModal';
import CreateHabitBtn from './CreateHabitBtn';

test('clicking "Create habit" should open the correct modal', async () => {
	render(
		<BrowserRouter>
			<GlobalModal>
				<CreateHabitBtn />
				);
			</GlobalModal>
		</BrowserRouter>
	);

	userEvent.click(screen.getByRole('button'));
	await screen.findByRole('dialog');
	expect(
		screen.getByRole('heading', { name: /create habit/i })
	).toBeInTheDocument();

	//habit name and category
	expect(screen.getByLabelText(/habit name/i)).toHaveValue('');
	expect(screen.getByLabelText(/habit category/i)).toHaveValue('');

	//habit schedule
	expect(screen.getByLabelText(/start tracking from/i)).toHaveValue(
		toISOFormat(new Date())
	);

	const checkboxGroup = screen.getByRole('group', {
		name: /weekly repeat cycle/i,
	});

	const checkboxes = within(checkboxGroup).getAllByRole('checkbox');
	checkboxes.forEach((checkbox) => expect(checkbox).toBeChecked());
	expect(checkboxes).toHaveLength(7);

	weekDaysArray.forEach((weekday) => {
		expect(
			within(checkboxGroup).getByLabelText(new RegExp(weekday, 'i'))
		).toBeInTheDocument();
	});

	//submit
	const submitButton = screen.getByRole('button', {
		name: /save habit/i,
	});
	expect(submitButton).toBeInTheDocument();
	expect(submitButton).toBeEnabled();
});
