import { useState } from 'react'
import { Alert, FlatList } from 'react-native'
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
import { AppError } from '@utils/AppError'
import { AddPlayerByGroup } from '@storage/player/AddPlayerByGroup'
import { getPlayerByGroup } from '@storage/player/getPlayerByGroup'

type RouteParams = {
  group: string
}

export function Players() {

  const [newPlayerName, setNewPlayerName] = useState('')

  const [players, setPlayers] = useState<string[]>([])
  const [team, setTeam] = useState<'Time A' | 'Time B'>('Time A')

  const route = useRoute()
  const { group } = route.params as RouteParams


  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar!')
    }

    const newPlayer = {
      name: newPlayerName,
      team: team
    }

    try {
      // Mandando o novo jogador (Que é um objeto criado a partir dos dados dos states) e o group que vem pela rota
      await AddPlayerByGroup(newPlayer, group)
      // const players = await getPlayerByGroup(group)
      // console.log(players)


    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possível adicionar o jogador.')
      }
    }
  }

  return (
    <Container>
      <Header showBackButton={true} />

      <Highlight
        title={group}
        subtitle='Adicione a galera e separe os times!'
      />


      <Form>
        <Input
          onChangeText={setNewPlayerName}
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />


        <ButtonIcon
          iconName='add'
          onPress={handleAddPlayer}
        />
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