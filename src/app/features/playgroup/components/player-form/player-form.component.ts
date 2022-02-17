import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlayersService } from 'src/app/core/services/players.service';
import { CreatePlayerDto } from 'src/app/shared/dtos/create-player.dto';

@Component({
  selector: 'playgroup-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent {
  playerForm = this.fb.group({
    name: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private playersService: PlayersService) {}

  onSubmit(): void {
    const createPlayerDto: CreatePlayerDto = this.playerForm.value;
    this.playersService.addPlayer(createPlayerDto).subscribe((player) => {
      console.log(player);
    })
  }
}
