export interface CreateGameDto {
    participants: {
      player: string;
      deck: string;
    }[];
    wincondition: boolean;
  }