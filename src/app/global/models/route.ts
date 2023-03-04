export interface Route {
  url: string;
}

// Create action for add route
export class AddRoute {
  static readonly type = '[Route] Add';
  constructor(public payload: Route) { }
}

// Create action for update route
export class UpdateRoute {
  static readonly type = '[Route] Update';
  constructor(public payload: Route) { }
}