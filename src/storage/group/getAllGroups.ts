import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function getAllGroups() {
  try {
    // Buscando as informações que estão no storage do usuário
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION)

    // Tudo que vem do storage, vem em string. Devemos alterar para o formato de array, já que teremos vários groups
    // Caso exista algo no storage, transformar. Caso contrário, devoltar um array Vazio
    const groups: string[] = storage ? JSON.parse(storage) : []

    return groups
  } catch (error) {
    throw error
  }

}