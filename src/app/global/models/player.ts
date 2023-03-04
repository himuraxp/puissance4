export interface Player {
  name: string;
  win: number;
  coins: number;
  position: number;
}

// Create action for add players
export class AddPlayer {
  static readonly type = '[Player] Add';
  constructor(public payload: Player) { }
}

// Create action for update players
export class UpdatePlayer {
  static readonly type = '[Player] Update';
  constructor(public payload: Player) { }
}

// Create action for delete players
export class DeletePlayer {
  static readonly type = '[Player] Delete';
  constructor(public payload: []) { }
}