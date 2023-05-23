import { PropsWithChildren, useContext } from 'react'
import { Redirect, Route } from 'wouter'
import { AuthContext } from './App'

export default function PrivateRoute(
    props: PropsWithChildren<{ path: string }>
) {
    const authContext = useContext(AuthContext)
    if (!authContext?.user) return <Redirect to="/login" />
    return <Route path={props.path}>{props.children}</Route>
}
