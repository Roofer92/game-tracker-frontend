import { Player } from "./player.model";

interface Commander {
    name: string;
    scryfall_url: string;
}

export interface Deck {
    _id: string;
    name: string;
    commander: Commander[];
    owner: Player;
    total_games: number;
    total_wins: number;
  }
  