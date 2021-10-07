import { LOGIN, LOGOUT } from './types'
import { initialState } from './AuthState'

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, user: payload }

    case LOGOUT:
      return { ...state, user: null }

    default:
      return state
  }
}

export default AuthReducer
