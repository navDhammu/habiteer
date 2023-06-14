import { render, screen } from 'test-utils'
import App from './App'

describe('initial page load', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('renders the login page if the user is not logged in', () => {
        const spy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)
        render(<App />)
        expect(spy).toHaveBeenCalledOnce()
        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /login/i })
        ).toBeInTheDocument()
    })
})
