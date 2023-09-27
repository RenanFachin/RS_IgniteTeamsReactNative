import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { getAllGroups } from "./getAllGroups";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName: string) {
  try {
    // Reproveitando a funçã de getAllGroups para "capturar" todos os dados que estão no storage do usuário
    const storedGroups = await getAllGroups()

    // validações: Se já existe um grupo com este nome
    const groupAlreadyExists = storedGroups.includes(newGroupName)

    if (groupAlreadyExists){
      throw new AppError('Este grupo já existe em sua lista de grupos.')
    }

    // Convertendo o array para um texto para então sim fazer o armazenamento no storage
    const storage = JSON.stringify([...storedGroups, newGroupName])

    // Armazenando algo no storage
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)


  } catch (error) {
    throw error;
  }
}