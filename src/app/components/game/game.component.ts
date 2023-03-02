import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Player, UpdatePlayer } from 'src/app/global/models/player';
import { PlayerService } from 'src/app/global/services/player.service';
import { Store } from '@ngxs/store';
import fr from 'src/app/global/languages/fr';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
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

  constructor(
    private playerService: PlayerService,
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.observPlayers = this.store.select((state) => state.players.players);
    this.subsrcib.push(
      this.observPlayers.subscribe((player: Player[]) => {
        this.players = player !== undefined ? player : [];
        if (this.players.length === 0) {
          this.players = this.playerService.getPlayer('players');
        }
      })
    );

    this.initFirstPlayer();
    this.generateBoard();
  }

  initFirstPlayer() {
    if (this.winner === undefined) {
      this.round = Math.floor(Math.random() * Math.floor(3));
      if (this.round === 0) {
        this.initFirstPlayer();
      }
    }
  }

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
    
    for (let i = 0; i < this.nbRow; i++) {
      this.table[i] = new Array(this.nbCol)
        .fill(null)
        .map(() => ({ value: 0 }));
    }
  }

  selectCol(col: number) {
    if (this.winner === null || this.winner === undefined) {
      let row: number | undefined;
      
      for (let i = this.nbRow - 1; i >= 0; i--) {
        if (this.table[i][col].value === 0) {
          row = i;
          break;
        }
      }
      
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

  highlight(position: number) {
    this.highlighted = position;
  }

  addCoin(row: number, col: number, player: number) {
    this.table[row][col].value = player;

    if (this.checkWinner(row, col, this.round)) {

    } else {
      if (this.moves === this.nbRow * this.nbCol - 1) {
        this.noWinner = 1;
      } else {
        this.moves++;
      }
    }

    this.players.forEach((player: Player) => {
      if (player.position === this.round) {
        player.coins--;
        this.store.dispatch(new UpdatePlayer(player));
      }
    });
  }

  checkWinner(row: number, col: number, round: number) {
    return false;
  }
}
