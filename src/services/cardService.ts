import type { AssignCardDTO, Card, CreateDeckDTO, Deck } from "../models/card";
import { handleApiError } from "../utils/handleApiError";
import api from "./api"



export const getAll = async (): Promise<Card[]> => {

  try {
    const response = await api.get<Card[]>('/cards');
    return response.data;

  } catch (error) {
    throw handleApiError(error, "error al obtener las cartas")
  }
}


export const getById = async (id: number): Promise<Card> => {

    try {
        const response = await api.get<Card>('/cards/' + id);
        return response.data;
    } catch (error) {
        throw handleApiError(error, "error al obtener la carta con id: " + id)
    }
}



export const createCard = async (CardData: Card): Promise<Card> => {
  
  try {
    const response = await api.post<Card>('/cards', CardData);
  
    console.log("Registro de carta: ", response);
    return response.data;

  } catch (error) {
    throw handleApiError(error, "error al crear la carta");    
  }
}



// ver si lo separo en diferentes servicios

export const getPlayerCollection = async (playerId: number): Promise<Card[]> => {

  try {
    const response = await api.get<Card[]>(`/decks/${playerId}/collection`)
    return response.data
  } catch (error) {
    throw handleApiError(error, "error al obtener la coleccion de cartas");    
  }
}

export const getPlayerDecks = async (): Promise<Deck[]> => {

  try {
    const response = await api.get<Deck[]>(`/decks`)
    return response.data
  } catch (error) {
    throw handleApiError(error, "error al obtener los mazos del jugador");    
  }
}



export const createDeck = async (deckData: CreateDeckDTO): Promise<void> => {

  try {
    await api.post('/decks', deckData)
  } catch (error) {
    throw handleApiError(error, 'Error al crear el mazo')
  }
}



export const assignCardsToDeck = async (deckId: number, cardDTO: AssignCardDTO): Promise<string> => {

  try {
    const response = await api.post(`/decks/${deckId}/assign`, cardDTO)
    
    return response.data
  } catch (error) {
    // manejo los errores con un handler
    throw handleApiError(error, 'Error al asignar cartas al mazo')
  }
}
