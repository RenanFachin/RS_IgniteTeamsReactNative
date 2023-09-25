import { ButtonIcon } from '@components/ButtonIcon';
import { Container, PlayersName, Icon } from './styles'
import { MaterialIcons } from '@expo/vector-icons'

interface PlayerCardProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  playerName: string;
  onRemove: () => void;
}

export function PlayerCard({ iconName, playerName, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon
        name={iconName}
      />

      <PlayersName>
        {playerName}
      </PlayersName>

      <ButtonIcon
        iconName='close'
        type='SECONDARY'
        onPress={onRemove}
      />
    </Container>
  )
}