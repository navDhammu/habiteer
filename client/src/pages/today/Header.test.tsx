// import { render, screen } from '@testing-library/react'
// import { subDays } from 'date-fns'
// import Header from './Header'
// import dayjs, { Dayjs } from 'dayjs'

// const setup = (date: Dayjs) =>
//     render(<Header date={date} onDateChange={vi.fn()} />)

// const today = dayjs();
// const yesterday = today.subtract(1, 'day')

// describe('Today page header', () => {
//     test('shows correct date and format', () => {
//         setup(today)
//         expect(screen.getByText(today.toDateString())).toBeInTheDocument()
//     })
//     describe('when date is today', () => {
//         beforeEach(() => {
//             setup(today)
//         })
//         test('right arrow button should be disabled', () => {
//             expect(
//                 screen.getByRole('button', { name: 'next day' })
//             ).toBeDisabled()
//         })
//         test('shows "today" text', () => {
//             expect(screen.getByText(/today/i)).toBeInTheDocument()
//         })
//     })
//     describe('when date is yesterday', () => {
//         beforeEach(() => {
//             setup(yesterday)
//         })
//         test('both arrow buttons are clickable', () => {
//             expect(
//                 screen.getByRole('button', { name: 'next day' })
//             ).not.toBeDisabled()
//             expect(
//                 screen.getByRole('button', { name: 'previous day' })
//             ).not.toBeDisabled()
//         })
//         test('shows "yesterday" text', () => {
//             expect(screen.getByText(/yesterday/i)).toBeInTheDocument()
//         })
//     })
//     describe('when date is any other date', () => {
//         beforeEach(() => {
//             setup(subDays(today, 5))
//         })
//         test('both arrow buttons are clickable', () => {
//             expect(
//                 screen.getByRole('button', { name: 'next day' })
//             ).not.toBeDisabled()
//             expect(
//                 screen.getByRole('button', { name: 'previous day' })
//             ).not.toBeDisabled()
//         })
//     })
// })
