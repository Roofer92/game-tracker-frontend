import { Deck } from "./deck.model";

export interface Player {
    _id: string;
    name: string;
    decks: Deck[];
    total_games: number;
    total_wins: number;
}
