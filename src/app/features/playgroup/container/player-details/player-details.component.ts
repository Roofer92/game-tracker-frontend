import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { DecksService } from 'src/app/core/services/decks.service';
import { PlayersService } from 'src/app/core/services/players.service';
import { CreateDeckDto } from 'src/app/shared/dtos/create-deck.dto';
import { Deck } from 'src/app/shared/model/deck.model';
import { Player } from 'src/app/shared/model/player.model';
import { DeckFormDialogComponent } from '../../components/deck-form-dialog/deck-form-dialog.component';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  @ViewChild('decksTable') decksTable: any;

  public player: Player | undefined;
  public favouriteDeck: Deck | undefined;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private playersService: PlayersService,
    private decksService: DecksService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.playersService.getPlayer(params['id']).subscribe((player: Player) => {
          this.player = player;
          this.decksTable.refresh(this.player.decks);
          this.setFavouriteDeck(player);
        });
      });
  }

  private setFavouriteDeck(player: Player) {
    let favouriteDeck: Deck | undefined = undefined;
    player.decks.forEach((deck: Deck) => {
      if (favouriteDeck == undefined) {
        favouriteDeck = deck;
        return;
      }

      if (deck.total_games > favouriteDeck.total_games) {
        this.favouriteDeck = deck;
      }
    });

    this.favouriteDeck = favouriteDeck;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeckFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !this.player) {
        return;
      }

      const createDeckDto: CreateDeckDto = {
        name: result.name,
        commander: [],
        owner: this.player._id,
      };

      createDeckDto.commander.push({
        name: result.commander,
        scryfall_id: result.commanderScryFallLink
      });

      if (result.partner) {
        createDeckDto.commander.push({
          name: result.partner,
          scryfall_id: result.partnerScryFallLink,
        });

      }

      this.decksService.addDeck(createDeckDto).subscribe((deck) => {
        if (!this.player) {
          return;
        }
        this.player.decks.push(deck);
        this.decksTable.refresh(this.player.decks);
      });
    });
  }
}
