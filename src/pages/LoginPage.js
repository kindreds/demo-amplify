import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/button'
import { useToast } from '@chakra-ui/toast'
import { Box, Center, Container, Heading, Divider } from '@chakra-ui/layout'

import InputField from '../components/InputField'
import loginSchema from '../validation/loginSchema'
import useAuthContext from '../hooks/useAuthContext'

const LoginPage = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { loginAction } = useAuthContext()
  const [isDirty, setIsDirty] = useState(false)
  const [errors, setErrors] = useState({ ok: true })
  const [password, setPassword] = useState('Vhnq2tsx+')
  const [email, setEmail] = useState('kazragore96@gmail.com')

  useEffect(() => {
    if (isDirty) {
      const errors = loginSchema({ email, password })
      setErrors(errors)
    }

    return () => {
      setIsDirty(false)
      setIsLoading(false)
    }
  }, [isDirty, email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsDirty(true)

    const errors = loginSchema({ email, password })
    if (!errors.ok) return setErrors(errors)

    setIsLoading(true)
    const user = await Auth.signIn(email, password).catch(({ name, code }) => {
      if (
        code === 'NotAuthorizedException' ||
        code === 'UserNotFoundException'
      ) {
        toast({
          title: 'Error',
          description: 'Correo o contraseña invalida',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    })

    console.log('LOGIN_AWS: ', user)

    if (!user) return

    toast({
      title: 'Login exitoso',
      description: 'Bienvenido a nuestra demo de AWS Amplify.',
      status: 'success',
      duration: 9000,
      isClosable: true
    })

    setIsLoading(false)
    const { attributes, username } = user
    loginAction({ email: attributes.email, username })
  }

  return (
    <Container>
      <Center h="100vh" w="full">
        <Box as="form" w="90%" onSubmit={handleSubmit}>
          <Heading textAlign="center" mb={10}>
            INGRESAR
          </Heading>

          <InputField
            mb={3}
            type="email"
            name="email"
            label="Correo"
            placeholder="Ingrese su correo"
            errors={errors}
            value={email}
            onChange={(v) => setEmail(v)}
          />
          <InputField
            mb={5}
            type="password"
            name="password"
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            errors={errors}
            value={password}
            onChange={(v) => setPassword(v)}
          />

          <Button
            w="full"
            type="submit"
            isLoading={isLoading}
            colorScheme="facebook"
          >
            Ingresar
          </Button>

          <Divider my={3} />

          <Button
            as={Link}
            w="full"
            to="/register"
            variant="outline"
            colorScheme="facebook"
          >
            Registrarse
          </Button>
        </Box>
      </Center>
    </Container>
  )
}

export default LoginPage
