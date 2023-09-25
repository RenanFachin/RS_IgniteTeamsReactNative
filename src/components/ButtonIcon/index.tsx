import { ButtonIconTypeStyleProps, Container, Icon } from './styles'
import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface Props extends TouchableOpacityProps {
  // pegando todas as possibilidades de ícones da lib de MaterialIcons
  iconName: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStyleProps;
}

export function ButtonIcon({ type = 'PRIMARY', iconName, ...props }: Props) {
  return (
    <Container {...props}>
      <Icon
        name={iconName}
        type={type}
      />
    </Container>
  )
}