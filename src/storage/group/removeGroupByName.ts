import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '../storageConfig'
import { getAllGroups } from './getAllGroups'

export async function groupRemoveByName(groupName: string) {
  try {

    const storedGroups = await getAllGroups()

    const groups = storedGroups.filter(group => group !== groupName)

    // Removendo o group
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))

    // Removendo os participantes deste grupo deletado
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)

  } catch (error) {

  }
}