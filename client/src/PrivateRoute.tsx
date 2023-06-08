import { PropsWithChildren } from 'react'
import { Redirect, Route } from 'wouter'
import { useAuthContext } from 'context/AuthContext'

export default function PrivateRoute(
    props: PropsWithChildren<{ path: string }>
) {
    const { user } = useAuthContext()

    if (!user) return <Redirect to="/login" />
    return <Route path={props.path}>{props.children}</Route>
}
