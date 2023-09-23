import { TouchableOpacityProps } from 'react-native'
import { Container, Title, ButtonTypeStyleProps } from './styles'


// Criando um type, extendendo as propriedades default do touchableopacity
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  buttonType?: ButtonTypeStyleProps
}

export function Button({ title, buttonType = 'PRIMARY', ...props }: ButtonProps) {
  return (
    <Container buttonType={buttonType} {...props}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}