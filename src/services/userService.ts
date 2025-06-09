import type { User } from "../models/user";
import api from "./api"



export const getAll = async (): Promise<User[]> => {

  const response = await api.get<User[]>('/users');
  return response.data;
}


export const getById = async (id: number): Promise<User> => {

    const response = await api.get<User>('/users/' + id);

    return response.data;
}