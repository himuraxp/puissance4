import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';

import { AddRoute } from 'src/app/global/models/route';
import { Player, AddPlayer } from 'src/app/global/models/player';
import { PlayerService } from 'src/app/global/services/player.service';

import fr from 'src/app/global/languages/fr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  private players: Player[] = [];
  
  public texts = fr;
  
  playersForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private playerService: PlayerService
  ) {
    this.generateForm()
  }

  ngOnInit() {}

  // Creation of the player form with validation
  generateForm() {
    this.playersForm = this.fb.group({
      player1: ['', Validators.required],
      player2: ['', Validators.required],
    });
  }

  // Click event to create data players and redirect to the game
  start(player1: string, player2: string) {
    this.players.push(
      { name: player1, win: 0, coins: 21, position: 1 },
      { name: player2, win: 0, coins: 21, position: 2 }
    );
    this.setPlayersToStore(this.players);
    this.router.navigate(['/game']);
    this.store.dispatch(new AddRoute({ url: '/game' }));
  }


  // Set data players to store and localstorage
  setPlayersToStore(players: Player[]) {
    players.forEach((player: Player) => {
      this.store.dispatch(new AddPlayer(player));
    });
    this.playerService.setPlayers('players', players);
  }
}
