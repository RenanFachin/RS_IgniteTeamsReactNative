import { useState } from 'react'
import { FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Container, Form, HeaderList, PlayersCount } from './styles'

import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { ButtonIcon } from '@components/ButtonIcon'
import { PlayerCard } from '@components/PlayerCard'

type RouteParams = {
  group: string
}

export function Players() {
  // 'Renan', 'Apolo', 'Tom', 'Momoa'
  const [players, setPlayers] = useState<string[]>([])
  const [team, setTeam] = useState('Time A')

  const route = useRoute()
  const { group } = route.params as RouteParams

  return (
    <Container>
      <Header showBackButton={true} />

      <Highlight
        title={group}
        subtitle='Adicione a galera e separe os times!'
      />


      <Form>
        <Input
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />


        <ButtonIcon iconName='add' />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal={true} // Alterando a direção da flatList
        />

        <PlayersCount>
          {players.length}
        </PlayersCount>
      </HeaderList>


      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            iconName='person'
            playerName={item}
            onRemove={() => { }}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <ListEmpty message='Não há pessoas neste time.' />}
        contentContainerStyle={
          [
            { paddingBottom: 60 },
            players.length === 0 && { flex: 1 } // faz o component de listEmpty ocupar todo o espaço disponível qnd o total de jogadores em um time for vazio (igual a 0)
          ]
        }
      />


      <Button
        title='Remover Turma'
        buttonType='SECONDARY'
      />

    </Container>
  )
}