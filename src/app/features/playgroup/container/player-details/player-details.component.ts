import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { DecksService } from 'src/app/core/services/decks.service';
import { PlayersService } from 'src/app/core/services/players.service';
import { ScryfallService } from 'src/app/core/services/scryfall.service';
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
    private scryfallService: ScryfallService,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.playersService.getPlayer(params['id']).subscribe((player: Player) => {
          this.player = player;
          this.decksTable.refresh(this.player.decks);
          this._setFavouriteDeck(player);
        });
      });
  }

  public openDialog(): void {
    const createDeckDialogRef = this.dialog.open(DeckFormDialogComponent);

    createDeckDialogRef.afterClosed().subscribe(result => {
      if (!result || !this.player) {
        return;
      }

      this._addDeck(result);
    });
  }

  private _setFavouriteDeck(player: Player) {
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


  private _addDeck(result: { name?: any; commander: string; partner?: string; }): void {
    this._getCommanders(result).subscribe(commanders => {
      const deckDto = {
        name: result.name,
        commander: commanders,
        owner: this.player!._id
      }

      this.decksService.addDeck(deckDto).subscribe((deck) => {
        this.player!.decks.push(deck);
        this.decksTable.refresh(this.player!.decks);
      })
    })
  }


  private _getCommanders(result:{ name?: any; commander: string; partner?: string; }) {
    let $getCommander = this.scryfallService.getCardByName(result.commander).pipe(
      map(card => {
        return [{
          name: card.name,
          scryfall_id: card.id,
        }]
      })
    );

    if (result.partner) {
      const $getPartner = this.scryfallService.getCardByName(result.partner)
        .pipe(
          map(card => {
            return [{
              name: card.name,
              scryfall_id: card.id,
            }]
          })
        );

      $getCommander = forkJoin({
        commander: $getCommander,
        partner: $getPartner,
      }).pipe(
        map(response => [...response.commander, ...response.partner])
      )
    }

    return $getCommander;
  }
}
