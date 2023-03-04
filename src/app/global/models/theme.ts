export interface Theme {
    color: string;
  }
  
  // Create action for add theme
  export class AddTheme {
    static readonly type = '[Theme] Add';
    constructor(public payload: Theme) { }
  }
  
  // Create action for update theme
  export class UpdateTheme {
    static readonly type = '[Theme] Update';
    constructor(public payload: Theme) { }
  }
