import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlayersService } from 'src/app/core/services/players.service';
import { Deck } from 'src/app/shared/model/deck.model';
import { Player } from 'src/app/shared/model/player.model';

@Component({
  selector: 'app-game-form-dialog',
  templateUrl: './game-form-dialog.component.html',
  styleUrls: ['./game-form-dialog.component.css']
})
export class GameFormDialogComponent implements OnInit {
  public readonly DEFAULT_PLAYERS_NO = 4;
  public players: Player[] = [];
  public decks: Deck[] = [];

  public participants = this.initParticipants();

  public gameForm = this.fb.group({
    date: ['', Validators.required],
    wincondition: ['', Validators.required],
    participants: this.participants,
  });

  constructor(
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private playersService: PlayersService,
  ) { }

  ngOnInit(): void {
    this.playersService.getPlayers().subscribe((players) => {
      this.players = players;
    });
  }

  initParticipants(): FormArray {
    const initParticipants: FormArray = this.fb.array([]);
    for (let i = 0; i < this.DEFAULT_PLAYERS_NO; i++) {
      initParticipants.push(
        this.fb.group({
          player: ['', Validators.required],
          deck: ['', Validators.required],
          isWinner: ['', Validators.required]
        })
      );
    }
    return initParticipants;
  }

  getParticpiants(): FormArray {
    return this.gameForm.get('participants') as FormArray
  }

  addParticipant(): void {
    this.getParticpiants().push(
      this.fb.group({
        player: ['', Validators.required],
        deck: ['', Validators.required],
        isWinner: ['', Validators.required]
      })
    );
  }
}
