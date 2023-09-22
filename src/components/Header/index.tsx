import { Container, Logo, BackButton, BackIcon } from './styles'

import logoImg from '@assets/logo.png'

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
  return (
    <Container>


      {/* Fazendo um operador ternário para mostrar ou não o backButton  */}
      {
        showBackButton &&
        (
          <BackButton>
            <BackIcon />
          </BackButton>
        )
      }


      <Logo source={logoImg} />
    </Container>
  )
}
