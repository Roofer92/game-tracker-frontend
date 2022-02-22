import { Deck } from "../model/deck.model";
import { Player } from "../model/player.model";

export interface CreateGameDto {
    participants: {
      player: Player;
      deck: Deck;
    }[];
    wincondition: boolean;
    playedAt: Date;
  }