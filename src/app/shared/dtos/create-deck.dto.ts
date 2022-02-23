export interface CreateDeckDto {
  name: string;
  commander: {
    name: string;
    scryfall_id: string;
  }[];
  owner: string;
}
