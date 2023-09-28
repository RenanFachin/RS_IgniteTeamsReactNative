import { useState, useCallback } from 'react';
import { Container } from './styles'
import { Alert, FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { getAllGroups } from '@storage/group/getAllGroups';
import { Loading } from '@components/Loading';


export function Groups() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigation = useNavigation()

  const [groups, setGroups] = useState<string[]>(['Turma da Rocketseat', 'Turma do Ignite', 'Turma da PUC'])

  function handleNewGroup() {
    navigation.navigate('new')
  }

  // Listando os grupos
  async function fetchGroups() {
    try {
      setIsLoading(true)


      const data = await getAllGroups()

      // Armazenando os dados obtidos do storage no state
      setGroups(data)
    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregas as turmas.')
      console.log(error)
    } finally {
      // O finally não depende de sucesso ou falha, ele vai fazer a alteração do state de qualquer forma

      setIsLoading(false) // desativando o loading após o carregamento dos dados
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
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

      {isLoading ? <Loading /> :
        <FlatList
          // data = dados que vão ser carregados pela flatlist
          data={groups}
          // valor único para ser utilizado dentro da listagem
          keyExtractor={item => item}
          // renderItem vai ser responsável por renderizar um elemento
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          // contentContainerStyle = Aplica estilos ao container que envolve o contéudo da lista
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          // ListEmptyComponent = Vai renderizar quando não tiver nada
          ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?' />}
        />
      }

      <Button
        title='Criar nova turma'
        buttonType='PRIMARY'
        onPress={handleNewGroup}
      />
    </Container>
  );
}