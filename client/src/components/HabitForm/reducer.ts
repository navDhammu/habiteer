import { parseISO } from 'date-fns'
import { WEEKDAYS } from 'utils/dates'
import { FormState, TextInputKey } from './HabitForm'

type ActionType =
    | {
          type: TextInputKey
          payload: string
      }
    | {
          type: 'frequency'
          payload: FormState['repeatSchedule']['frequency']
      }
    | {
          type: 'days'
          payload: FormState['repeatSchedule']['days']
      }

export default function reducer(
    state: FormState,
    action: ActionType
): FormState {
    switch (action.type) {
        case 'name':
        case 'category':
        case 'description':
            return {
                ...state,
                [action.type]: action.payload,
            }
        case 'trackingStartDate':
            return {
                ...state,
                [action.type]: parseISO(action.payload),
            }
        case 'frequency':
            const frequency = action.payload
            return {
                ...state,
                repeatSchedule: {
                    frequency,
                    days: frequency === 'daily' ? WEEKDAYS : [],
                },
            }
        case 'days':
            const days = action.payload
            return {
                ...state,
                repeatSchedule: {
                    frequency: days.length === 7 ? 'daily' : 'weekly',
                    days: action.payload,
                },
            }
        default:
            throw new Error('Unkown action in habit form reducer')
    }
}
