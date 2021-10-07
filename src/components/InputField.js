import { Input } from '@chakra-ui/input'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { FormErrorMessage } from '@chakra-ui/react'

const InputField = ({
  value,
  errors,
  isInvalid,
  name = '',
  label = '',
  helperText,
  placeholder,
  type = 'text',
  onChange = () => {},
  ...props
}) => {
  return (
    <FormControl {...props} id={name} isInvalid={errors[name]}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        name={name}
        value={value}
        autoComplete="off"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
      {!errors.ok ? <FormErrorMessage>{errors[name]}</FormErrorMessage> : null}
    </FormControl>
  )
}

export default InputField
