import { useState } from 'react';
import { Container } from './styles'
import { FlatList } from 'react-native'

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard'
import { ListEmpty } from '@components/ListEmpty'

export function Groups() {
  //'Turma da Rocketseat', 'Turma do Ignite', 'Turma da PUC'
  const [groups, setGroups] = useState<string[]>([])

  return (
    <Container>
      <Header />

      <Highlight title='Turmas' subtitle='Jogue com a sua turma' />

      <FlatList
        data={groups} // data = dados que vão ser carregados pela flatlist
        keyExtractor={item => item} // valor único para ser utilizado dentro da listagem
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )} // renderItem vai ser responsável por renderizar um elemento
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?' />}
      // ListEmptyComponent = Vai renderizar quando não tiver nada
      />



    </Container>
  );
}