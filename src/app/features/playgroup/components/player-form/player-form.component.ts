import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlayersService } from 'src/app/core/services/players.service';
import { CreatePlayerDto } from 'src/app/shared/dtos/create-player.dto';

@Component({
  selector: 'playgroup-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent {
  @Output() submitted: EventEmitter<CreatePlayerDto> = new EventEmitter();

  playerForm = this.fb.group({
    name: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (!this.playerForm.valid) {
      return;
    }
    
    const createPlayerDto: CreatePlayerDto = this.playerForm.value;
    this.submitted.emit(createPlayerDto);
  }
}
