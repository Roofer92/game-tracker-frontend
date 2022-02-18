import { Deck } from "./deck.model";
import { Player } from "./player.model";
import { Wincondition } from "./wincondition.model";

interface Participant {
    player: Player;
    deck: Deck;
    isWinner: boolean;
  }
  

export interface Game {
    participants: Participant[];
    wincondition: Wincondition;
}