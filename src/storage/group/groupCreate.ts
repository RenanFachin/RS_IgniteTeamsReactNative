import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { getAllGroups } from "./getAllGroups";

export async function groupCreate(newGroupName: string) {
  try {
    // Reproveitando a funçã de getAllGroups para "capturar" todos os dados que estão no storage do usuário
    const storedGroups = await getAllGroups()
    // Convertendo o array para um texto para então sim fazer o armazenamento no storage
    const storage = JSON.stringify([...storedGroups, newGroupName])

    // Armazenando algo no storage
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)


  } catch (error) {
    throw error;
  }
}