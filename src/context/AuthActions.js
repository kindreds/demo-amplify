import { LOGIN, LOGOUT } from './types'

const AuthActions = (state, dispatch) => {
  const loginAction = async (payload) => {
    dispatch({ type: LOGIN, payload })
  }

  const logoutAction = () => {
    dispatch({ type: LOGOUT })
  }

  return { loginAction, logoutAction }
}

export default AuthActions
