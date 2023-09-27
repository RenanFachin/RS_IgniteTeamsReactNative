import { getPlayerByGroup } from './getPlayerByGroup'

export async function getPlayerByGroupAndTeam(group: string, team: string) {
  try {
    // Pegando todos os jogadores a partir do grupo
    const storage = await getPlayerByGroup(group)

    // Percorrendo cada jogador dentro do stroage e validando a propriedade team para verificar com o team passado como param
    const players = storage.filter(player => player.team === team)

    return players

  } catch (error) {
    throw error
  }
}