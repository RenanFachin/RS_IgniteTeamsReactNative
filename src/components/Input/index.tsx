import { Container } from './styles'
import { TextInputProps } from 'react-native'

interface InputProps extends TextInputProps { }

export function Input({ ...props }: InputProps) {
  return (
    <Container {...props} />
  )
}