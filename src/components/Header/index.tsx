import { useNavigation  } from '@react-navigation/native'
import { Container, Logo, BackButton, BackIcon } from './styles'

import logoImg from '@assets/logo.png'

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation()

  function handleGoBack(){
    // 2 maneiras de voltar para a página inicial
    // navigation.dispatch(StackActions.popToTop())
    navigation.navigate('groups')  
  }

  return (
    <Container>


      {/* Fazendo um operador ternário para mostrar ou não o backButton  */}
      {
        showBackButton &&
        (
          <BackButton onPress={handleGoBack}>
            <BackIcon />
          </BackButton>
        )
      }


      <Logo source={logoImg} />
    </Container>
  )
}
