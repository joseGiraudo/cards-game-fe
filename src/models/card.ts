

export interface Card {
    id: number;
    name: string;
    attack: number;
    defense: number;
    illustration: number;
}


export interface CardDTO {
    name: string;
    attack: number;
    defense: number;
    illustration: number;
}

export interface Deck {
    id: number;
    playerId: number;
    name: string;
    cards: Card[]
}

export interface CreateDeckDTO {
  name: string;
}

export interface AssignCardDTO {
  cardIds: number[];
}

export interface Series {
    id: number;
    name: string;
    releaseDate: Date;
    cards: Card[]
}