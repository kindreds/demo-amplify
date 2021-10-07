import { useContext } from 'react'
import { AuthContext } from '../context/AuthState'

const useAuthContext = () => {
  return useContext(AuthContext)
}

export default useAuthContext
