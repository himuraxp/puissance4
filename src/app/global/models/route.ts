export interface Route {
    url: string;
}

export class AddRoute {
    static readonly type = '[Route] Add';
    constructor(public payload: Route) { }
}

export class UpdateRoute {
    static readonly type = '[Route] Update';
    constructor(public payload: Route) { }
}