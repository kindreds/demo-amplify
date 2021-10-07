import { Button } from '@chakra-ui/button'
import {
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Text
} from '@chakra-ui/layout'
import useAuthContext from '../hooks/useAuthContext'
import { Auth } from 'aws-amplify'

const HomePage = () => {
  const { user = { email: '', username: '' }, logoutAction } = useAuthContext()

  const handleLogout = async () => {
    try {
      await Auth.signOut()
    } catch (error) {
      console.log('ERROR_LOGOUT: ', error)
    }

    logoutAction()
  }

  return (
    <Container>
      <Center h="100vh">
        <Flex flexDir="column">
          <Heading fontWeight="thin" fontSize="5xl">
            Bienvenido
          </Heading>
          <Divider mb={2} />
          <Text fontSize="xl">{user.email}</Text>
          <Text fontWeight="thin">ID: {user.username}</Text>

          <Button
            mt={10}
            colorScheme="red"
            variant="outline"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </Flex>
      </Center>
    </Container>
  )
}

export default HomePage
