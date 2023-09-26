import { useState } from 'react'
import { Container, Content, Icon } from './styles'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

export function NewGroup() {
  const navigation = useNavigation()

  const [groupName, setGroupName] = useState('')

  function handleNewPlayer() {
    navigation.navigate('players', { group: groupName })
  }

  return (
    <Container>
      <Header showBackButton={true} />

      <Content>
        <Icon />

        <Highlight
          title='Nova turma'
          subtitle='Crie a turma para adicionar as pessoas'
        />

        <Input
          placeholder='Nome da turma'
          onChangeText={setGroupName}
        />

        <Button
          title='Criar'
          hasIcon
          style={{ marginTop: 20 }}
          onPress={handleNewPlayer}
        />
      </Content>
    </Container>
  )
}