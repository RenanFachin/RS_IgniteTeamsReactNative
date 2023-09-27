import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError"; // Tratamento de erro
import { PLAYER_COLLECTION } from "@storage/storageConfig"; // Config do chave-valor
import { PlayerStorageDTO } from "./PlayerStorageDTO"; // Tipagem
import { getPlayerByGroup } from './getPlayerByGroup'

export async function AddPlayerByGroup(newPlayerName: PlayerStorageDTO, group: string) {
  try {
    /* Lógica:
      @ignite-teams:players-${group}: ['jogador 1', 'jogador 2']
    */

    const storedPlayers = await getPlayerByGroup(group)

    // Verificando se a pessoa já está adicionada
    // Percorrendo cada jogador e em cada jogador, verificar se o nome é igual ao nome do novo player a ser adicionado
    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayerName.name)

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um dos times.')
    }

    const storage = JSON.stringify([...storedPlayers, newPlayerName])

    // adicionando o player
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)

  } catch (error) {
    throw (error)
  }
}