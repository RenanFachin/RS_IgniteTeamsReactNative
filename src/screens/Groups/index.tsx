import { useState, useCallback } from 'react';
import { Container } from './styles'
import { FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { getAllGroups } from '@storage/group/getAllGroups';


export function Groups() {
  const navigation = useNavigation()

  const [groups, setGroups] = useState<string[]>(['Turma da Rocketseat', 'Turma do Ignite', 'Turma da PUC'])

  function handleNewGroup() {
    navigation.navigate('new')
  }

  // Listando os grupos
  async function fetchGroups() {
    try {
      const data = await getAllGroups()

      // Armazenando os dados obtidos do storage no state
      setGroups(data)
    } catch (error) {
      console.log(error)
    }
  }

  // https://reactnavigation.org/docs/use-focus-effect/
  useFocusEffect(
    useCallback(() => {
      // console.log("use Focus Effect executou")
      fetchGroups()
    }, []))

  return (
    <Container>
      <Header />

      <Highlight title='Turmas' subtitle='Jogue com a sua turma' />

      <FlatList
        // data = dados que vão ser carregados pela flatlist
        data={groups}
        // valor único para ser utilizado dentro da listagem
        keyExtractor={item => item}
        // renderItem vai ser responsável por renderizar um elemento
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
        // contentContainerStyle = Aplica estilos ao container que envolve o contéudo da lista
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        // ListEmptyComponent = Vai renderizar quando não tiver nada
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?' />}
      />

      <Button
        title='Criar nova turma'
        buttonType='PRIMARY'
        onPress={handleNewGroup}
      />
    </Container>
  );
}