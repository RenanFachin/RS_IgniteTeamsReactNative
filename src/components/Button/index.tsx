import { TouchableOpacityProps } from 'react-native'
import { Container, Title, ButtonTypeStyleProps, BackButton, BackIcon } from './styles'


// Criando um type, extendendo as propriedades default do touchableopacity
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  hasIcon?: boolean
  buttonType?: ButtonTypeStyleProps
}

export function Button({ title, buttonType = 'PRIMARY', hasIcon = false, ...props }: ButtonProps) {
  return (
    <Container buttonType={buttonType} {...props}>

      {
        hasIcon &&
        (
          <BackButton>
            <BackIcon />
          </BackButton>
        )
      }

      <Title>
        {title}
      </Title>
    </Container>
  )
}