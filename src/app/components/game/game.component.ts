import { Component, OnInit } from '@angular/core';
import { transition, trigger } from '@angular/animations';

import { Observable, Subscription, timeout } from 'rxjs';
import { Store } from '@ngxs/store';

import { Player, UpdatePlayer } from 'src/app/global/models/player';
import { PlayerService } from 'src/app/global/services/player.service';

import { activeCoin, runCoinAnimate } from './animates/coin';
import { activeBoard, runBoardAnimate } from './animates/board';
import { activePlayer1, runPlayer1Animate, activePlayer2, runPlayer2Animate } from './animates/players';

import fr from 'src/app/global/languages/fr';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    activeCoin,
    trigger('activeCoin', [
      transition(':enter', runCoinAnimate()),
    ]),
    activeBoard,
    trigger('activeBoard', [
      transition(':enter', runBoardAnimate()),
    ]),
    activePlayer1,
    trigger('activePlayer1', [
      transition(':enter', runPlayer1Animate()),
    ]),
    activePlayer2,
    trigger('activePlayer2', [
      transition(':enter', runPlayer2Animate()),
    ])
  ],
})

export class GameComponent implements OnInit {
  private subsrcib: Subscription[] = [];
  private observPlayers: Observable<Player[]> | undefined;
  private nbRow: number = 6;
  private nbCol: number = 7;

  public texts = fr;
  public players: Player[] = [];
  public winner: Player | undefined;
  public round: number = 0;
  public moves: number = 0;
  public table = new Array(this.nbRow);
  public highlighted: number = -1;
  public noWinner: number = 0;
  public winAnimate: boolean = false;

  constructor(
    private playerService: PlayerService,
    private store: Store,
  ) { }

  // Players data initialization
  ngOnInit() {
    this.observPlayers = this.store.select((state) => state.players.players);
    this.subsrcib.push(
      this.observPlayers.subscribe((player: Player[]) => {
        this.players = player !== undefined ? player : [];
        if (this.players.length === 0) {
          this.players = this.playerService.getPlayers('players');
        }
      })
    );

    this.initFirstPlayer();
    this.generateBoard();
  }

  // Select the player who start the game
  initFirstPlayer() {
    if (this.winner === undefined) {
      this.round = Math.floor(Math.random() * Math.floor(3));
      if (this.round === 0) {
        this.initFirstPlayer();
      }
    }
  }

  // Initialization of game data
  generateBoard() {
    this.noWinner = 0;
    this.moves = 0;
    this.players.forEach((player: Player) => {
      player.coins = 21;
    });

    if (this.winner !== null && this.winner !== undefined) {
      this.initFirstPlayer();
    }

    this.winner = undefined;

    // Generation of a two-dimensional array representing the game grid
    for (let i = 0; i < this.nbRow; i++) {
      this.table[i] = new Array(this.nbCol)
        .fill(null)
        .map(() => ({ value: 0 }));
    }
  }

  // Click event for select column
  selectCol(col: number) {
    if (this.winner === null || this.winner === undefined) {
      let row: number | undefined;

      for (let i = this.nbRow - 1; i >= 0; i--) {
        if (this.table[i][col].value === 0) {
          row = i;
          break;
        }
      }

      // Update the next player
      if (row !== undefined) {
        if (this.round % 2 === 1) {
          this.round = 1;
        } else {
          this.round = 2;
        }

        this.addCoin(row, col, this.round);
        this.round++;

        return row;
      }

    }
    return 0;
  }

  // MouseOver event to highlight a column
  highlight(position: number) {
    this.highlighted = position;
  }

  // Update table with the coin position
  addCoin(row: number, col: number, player: number) {
    this.table[row][col].value = player;

    // Ckeck have a winner or tie game
    if (this.checkWinner(row, col, this.round)) {
      this.eventWinner(this.round);
    } else {
      if (this.moves === this.nbRow * this.nbCol - 1) {
        this.noWinner = 1;
      } else {
        this.moves++;
      }
    }

    // Remove a coin from the player who just played and update this on store
    this.players.forEach((player: Player) => {
      if (player.position === this.round) {
        player.coins--;
        this.store.dispatch(new UpdatePlayer(player));
      }
    });
  }

  // Checks if a condition is met to win the game
  checkWinner(row: number, col: number, round: number) {
    let max = 4;
    let count = 0;
    let position = row - col;

    // Horizontal checking
    for (let i = 0; i < this.nbCol; i++) {
      count = this.table[row][i].value === round ? (count + 1) : 0;
      if (count >= max) {
        return true;
      }
    }

    // Vertical checking
    count = 0;
    for (let i = 0; i < this.nbRow; i++) {
      count = this.table[i][col].value === round ? (count + 1) : 0;
      if (count >= max) {
        return true;
      }
    }

    // Diagonal top to bottom checking
    count = 0;
    for (let i = Math.max(position, 0); i < Math.min(this.nbRow, this.nbCol + position); i++) {
      count = this.table[i][i - position].value === round ? (count + 1) : 0;
      if (count >= max) {
        return true;
      }
    }

    // Diagonal bottom to top checking
    count = 0;
    position = row + col;
    for (let i = Math.max(position - this.nbCol + 1, 0); i < Math.min(this.nbRow, position + 1); i++) {
      count = this.table[i][position - i].value === round ? (count + 1) : 0;
      if (count >= max) {
        return true;
      }
    }

    return false;
  }

  // When the game is won increase the score of the player and update this on store
  eventWinner(round: number) {
    this.winAnimate = true;
    this.players.forEach((player: Player) => {
      if (player.position === round) {
        this.winner = player;
        player.win++;
      }
    });
    this.playerService.setPlayers('players', this.players);
    setTimeout(() => {
      this.winAnimate = false;
    }, 5000)
  }
}
