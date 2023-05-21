export type Habit = {
    id: string
    name: string
    category: string
    description: string
    trackingStartDate: Date
    repeatDays: {
        ['Monday']: boolean
        ['Tuesday']: boolean
        ['Wednesday']: boolean
        ['Thursday']: boolean
        ['Friday']: boolean
        ['Saturday']: boolean
        ['Sunday']: boolean
    }
}
