import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

const registerSchema = ({ email, password, confirmPassword }) => {
  const errors = { ok: true }
  if (!isEmail(email)) {
    errors.ok = false
    errors.email = 'Debes ingresar un formato de correo valido'
  }
  if (isEmpty(password)) {
    errors.ok = false
    errors.password = 'La contraseña es requerida'
  }
  if (confirmPassword !== password) {
    errors.ok = false
    errors.confirmPassword = 'Las contraseñas deben ser iguales'
  }

  return errors
}

export default registerSchema
