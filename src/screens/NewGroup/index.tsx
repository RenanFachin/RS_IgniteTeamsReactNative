import { useState } from 'react'
import { Alert } from 'react-native'
import { Container, Content, Icon } from './styles'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'

export function NewGroup() {
  const navigation = useNavigation()

  const [groupName, setGroupName] = useState('')

  async function handleNewPlayer() {
    try {
      if(groupName.trim().length === 0) {
        // caso não tenha contéudo
        return Alert.alert('Novo Grupo', 'Informe o nome da turma.')
      }

      // salvando no storage
      await groupCreate(groupName)
      navigation.navigate('players', { group: groupName })

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
        console.log(error)
      }
    }
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