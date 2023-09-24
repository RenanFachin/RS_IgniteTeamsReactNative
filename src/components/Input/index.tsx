import { Container } from './styles'
import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

interface InputProps extends TextInputProps {}

export function Input({ ...props }: InputProps) {
  const { COLORS } = useTheme()

  return (
    <Container
      placeholderTextColor={COLORS.GRAY_300}
      {...props}
    />
  )
}