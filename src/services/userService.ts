import type { User, UserDTO } from "../models/user";
import { handleApiError } from "../utils/handleApiError";
import api from "./api"



export const getAll = async (): Promise<User[]> => {

  const response = await api.get<User[]>('/users');
  return response.data;
}


export const getById = async (id: number): Promise<User> => {

    const response = await api.get<User>('/users/' + id);

    return response.data;
}

export const registerPlayer = async (playerData: UserDTO): Promise<User> => {
  
  try {
    const response = await api.post<User>('/users/register', playerData);
    console.log("Registro de player: ", response);
    return response.data;
    
  } catch (error) {
    throw handleApiError(error, "Error al registrar el jugador");
  }
}

export const createUser = async (userData: UserDTO): Promise<User> => {
  
  const response = await api.post<User>('/users', userData);
  
  console.log("Registro de usuario: ", response);
  return response.data;
}