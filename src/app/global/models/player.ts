export interface Player {
  name: string;
  win: number;
  coins: number;
  position: number;
}

export class AddPlayer {
  static readonly type = '[Player] Add';
  constructor(public payload: Player) { }
}

export class UpdatePlayer {
  static readonly type = '[Player] Update';
  constructor(public payload: Player) { }
}

export class DeletePlayer {
  static readonly type = '[Player] Delete';
  constructor(public payload: []) { }
}