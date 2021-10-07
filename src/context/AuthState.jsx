import { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'
import AuthActions from './AuthActions'

export const AuthContext = createContext()

export const initialState = {
  user: null
}

const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const actions = AuthActions(state, dispatch)

  return (
    <AuthContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
