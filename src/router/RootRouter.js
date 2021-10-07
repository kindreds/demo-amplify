import { useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import useAuthContext from '../hooks/useAuthContext'
import ConfirmRegister from '../pages/ConfirmRegister'

const RootRouter = () => {
  const { user, loginAction } = useAuthContext()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(({ attributes, username }) => {
        loginAction({ email: attributes.email, username })
      })
      .catch((err) => console.log('ERROR_ROOTROUTER_LOGIN', err))
  }, [])

  const HomePages = () => (
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Redirect from="/login" to="/" />
    </Switch>
  )
  const AuthPages = () => (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/confirmRegister" component={ConfirmRegister} />

      <Redirect from="/" to="/login" />
    </Switch>
  )

  return <div>{user ? HomePages() : AuthPages()}</div>
}

export default RootRouter
