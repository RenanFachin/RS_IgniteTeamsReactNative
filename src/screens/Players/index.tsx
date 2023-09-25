import { useState } from 'react'
import { FlatList } from 'react-native'
import { Container, Form, HeaderList, PlayersCount } from './styles'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'

export function Players() {
  const [players, setPlayers] = useState<string[]>(['Renan', 'Apolo'])
  const [team, setTeam] = useState('Time A')

  return (
    <Container>
      <Header showBackButton={true} />

      <Highlight
        title='Nome da turma'
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
            onRemove={() => {}}
          />
        )}
      />

    </Container>
  )
}