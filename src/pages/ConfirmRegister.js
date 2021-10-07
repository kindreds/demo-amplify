import { useState } from 'react'
import { Auth } from 'aws-amplify'
import { Button } from '@chakra-ui/button'
import { useToast } from '@chakra-ui/toast'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Text,
  Stack,
  Center,
  HStack,
  Heading,
  Container
} from '@chakra-ui/layout'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'

const ConfirmRegisterPage = () => {
  const toast = useToast()
  const history = useHistory()
  const [code, setCode] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email } = history.location.state

    const status = await Auth.confirmSignUp(email, code).catch(
      ({ name, code }) => {
        console.log({ name, code })
      }
    )

    if (status !== 'SUCCESS') {
      return console.log('CODE_STATUS: ', status)
    }

    toast({
      title: 'Confirmación Exitosa',
      description: 'La confirmacion de registro ha sido exitosa.',
      status: 'success',
      duration: 9000,
      isClosable: true
    })

    console.log('CONFIRM_REGISTER_AWS: ', status === 'SUCCESS')
    history.push('/login')
  }

  const disabled = code.length !== 6

  return (
    <Container>
      <Center h="100vh" w="full">
        <Box as="form" w="90%" onSubmit={handleSubmit}>
          <Stack spacing={0}>
            <Heading textAlign="center">CONFIRMAR</Heading>

            <Text textAlign="center" fontWeight="thin">
              Ingresa el codigo recibido en tu correo
            </Text>
          </Stack>

          <HStack justifyContent="center" my={10}>
            <PinInput value={code} onChange={(v) => setCode(v)}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>

          <Button
            w="full"
            type="submit"
            disabled={disabled}
            colorScheme="facebook"
          >
            Confirmar
          </Button>
        </Box>
      </Center>
    </Container>
  )
}

export default ConfirmRegisterPage
