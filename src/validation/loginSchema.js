import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

const loginSchema = ({ email, password }) => {
  const errors = { ok: true }
  if (!isEmail(email)) {
    errors.ok = false
    errors.email = 'Debes ingresar un formato de correo valido'
  }
  if (isEmpty(password)) {
    errors.ok = false
    errors.password = 'La contraseña es requerida'
  }

  return errors
}

export default loginSchema
