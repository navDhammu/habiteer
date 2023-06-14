import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import AuthProvider from 'context/AuthContext'
import HabitsProvider from 'context/HabitsContext'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <HabitsProvider>{children}</HabitsProvider>
        </AuthProvider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
