import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlayersService } from 'src/app/core/services/players.service';
import { Player } from 'src/app/shared/model/player.model';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  public player: Player | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playersService: PlayersService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.playersService.getPlayer(params['id']).subscribe((player: Player) => {
          this.player = player;
        });
      });
  }

}
