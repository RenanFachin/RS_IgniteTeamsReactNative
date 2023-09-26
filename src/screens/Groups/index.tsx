import { useState } from 'react';
import { Container } from './styles'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'


export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Turma da Rocketseat', 'Turma do Ignite', 'Turma da PUC'])

  const navigation = useNavigation()
  function handleNewGroup(){
    navigation.navigate('players', {group: 'Turma do Ignite'})
  }

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