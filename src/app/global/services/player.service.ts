import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Player } from 'src/app/global/models/player';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  localStorage: Storage;
  subject = new Subject();

  constructor() {
    this.localStorage = window.localStorage;
  }

  getPlayer(key: string): any {
    if (this.localStorage) {
      return JSON.parse(this.localStorage.getItem(key)+'');
    }
    return null;
  }

  setPlayers(key: string, value: Player[]): boolean {
    if (this.localStorage) {
      this.localStorage.setItem(key, JSON.stringify(value));
      this.subject.next({
        type: 'set',
        key,
        value,
      });
      return true;
    }
    return false;
  }

  removePlayer(key: string): boolean {
    if (this.localStorage) {
      this.localStorage.removeItem(key);
      this.subject.next({
        type: 'remove',
        key,
      });
      return true;
    }
    return false;
  }
}
