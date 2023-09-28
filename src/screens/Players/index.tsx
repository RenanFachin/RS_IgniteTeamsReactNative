import { useState, useEffect, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Container, Form, HeaderList, PlayersCount } from './styles'

import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { ButtonIcon } from '@components/ButtonIcon'
import { PlayerCard } from '@components/PlayerCard'

import { AppError } from '@utils/AppError'
import { AddPlayerByGroup } from '@storage/player/AddPlayerByGroup'
import { getPlayerByGroupAndTeam } from '@storage/player/GetPlayerByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { removePlayerByGroup } from '@storage/player/removePlayerByGroup'
import { groupRemoveByName } from '@storage/group/removeGroupByName'

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [newPlayerName, setNewPlayerName] = useState('')

  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [team, setTeam] = useState('')

  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPLayerNameInputRef = useRef<TextInput>(null)

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

      newPLayerNameInputRef.current?.blur() // tirando o focus do input após adicionar

      setNewPlayerName('') // retornando o valor para o inicial

      fetchPlayersByTeam()


    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possível adicionar o jogador.')
      }
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group)

      fetchPlayersByTeam()

    } catch (error) {
      console.log(error)

      Alert.alert("Remover pessoa", "Não foi possível remover a pessoa selecionada.")
    }
  }

  const navigation = useNavigation()
  async function groupRemove() {
    try {
      // deletando o grupo
      await groupRemoveByName(group)

      // redirecionando o usuário
      navigation.navigate('groups')

    } catch (error) {
      console.log(error)

      Alert.alert("Remover grupo", "Não foi possível remover o grupo.")
    }
  }

  async function handleRemoveGroup() {
    Alert.alert(
      'Remover', // Título
      'Deseja remover o grupo?', // Mensagem
      [
        // Opções
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove }
      ]
    )
  }

  async function fetchPlayersByTeam() {
    try {
      // Ativando o loading até que o carregamento seja feito
      setIsLoading(true)

      // group vem por param da interface e o team vem do state
      const playersByTeam = await getPlayerByGroupAndTeam(group, team)

      setPlayers(playersByTeam)
      
    } catch (error) {
      console.log(error)
      Alert.alert("Pessoas", "Não foi possível carregar as informações.")
    } finally {
      // Desativando o loading após o carregamento
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton={true} />

      <Highlight
        title={group}
        subtitle='Adicione a galera e separe os times!'
      />


      <Form>
        <Input
          inputRef={newPLayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
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


      {isLoading ?
        <Loading />
        :
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              iconName='person'
              playerName={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
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
      }

      <Button
        title='Remover Turma'
        buttonType='SECONDARY'
        onPress={handleRemoveGroup}
      />

    </Container>
  )
}