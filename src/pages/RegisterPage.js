import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { Button } from '@chakra-ui/button'
import { useToast } from '@chakra-ui/toast'
import { Link, useHistory } from 'react-router-dom'
import { Box, Center, Container, Heading, Divider } from '@chakra-ui/layout'

import InputField from '../components/InputField'
import registerSchema from '../validation/registerSchema'

const RegisterPage = () => {
  const toast = useToast()
  const history = useHistory()
  const [isDirty, setIsDirty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ ok: true })
  const [email, setEmail] = useState('kazragore96@gmail.com')
  const [password, setPassword] = useState('Vhnq2tsx+')
  const [confirmPassword, setConfirmPassword] = useState('Vhnq2tsx+')

  useEffect(() => {
    if (isDirty) {
      const errors = registerSchema({
        email,
        password,
        confirmPassword
      })
      setErrors(errors)
    }
  }, [isDirty, confirmPassword, email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsDirty(true)

    const errors = registerSchema({
      email,
      password,
      confirmPassword
    })
    if (!errors.ok) return setErrors(errors)

    setIsLoading(true)
    const user = await Auth.signUp({
      username: email,
      password,
      attributes: { email }
    }).catch(({ name, code }) => {
      console.log({ name, code })
      if (code === 'UsernameExistsException') {
        toast({
          title: 'Alerta',
          description: 'Correo ya existe.',
          status: 'warning',
          duration: 9000,
          isClosable: true
        })
      }
      setIsLoading(false)
    })
    setIsLoading(false)

    console.log('REGISTER_AWS: ', user)

    if (!user) return

    toast({
      title: 'Registro Exitoso',
      description:
        'Recibiras un codigo a tu correo para confirmar el registro.',
      status: 'success',
      duration: 9000,
      isClosable: true
    })

    setIsDirty(false)
    history.push('/confirmRegister', { email })
  }

  return (
    <Container>
      <Center h="100vh" w="full">
        <Box as="form" w="90%" onSubmit={handleSubmit}>
          <Heading textAlign="center" mb={10}>
            REGISTER
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
          <InputField
            mb={5}
            type="password"
            name="confirmPassword"
            label="Confirmar Contraseña"
            placeholder="Confirme su contraseña"
            errors={errors}
            value={confirmPassword}
            onChange={(v) => setConfirmPassword(v)}
          />

          <Button
            w="full"
            type="submit"
            isLoading={isLoading}
            colorScheme="facebook"
          >
            Registrarse
          </Button>

          <Divider my={3} />

          <Button
            as={Link}
            w="full"
            to="/login"
            variant="outline"
            colorScheme="facebook"
          >
            Iniciar sesión
          </Button>
        </Box>
      </Center>
    </Container>
  )
}

export default RegisterPage
