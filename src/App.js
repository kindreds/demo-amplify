import Amplify from 'aws-amplify'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import theme from './theme'
import awsconfig from './aws-exports'
import AuthState from './context/AuthState'
import RootRouter from './router/RootRouter'

Amplify.configure(awsconfig)

const App = () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthState>
        <BrowserRouter>
          <RootRouter />
        </BrowserRouter>
      </AuthState>
    </ChakraProvider>
  )
}

export default App
