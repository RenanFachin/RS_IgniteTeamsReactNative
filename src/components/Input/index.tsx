import { Container } from './styles'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

interface InputProps extends TextInputProps {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...props }: InputProps) {
  const { COLORS } = useTheme()

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...props}
    />
  )
}