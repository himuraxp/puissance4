import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Route, AddRoute, UpdateRoute } from '../../models/route';

export class RouteStateModel {
  route: Route = {
    url: '',
  };
}

// State metadata initialization
@State<RouteStateModel>({
  name: 'Route',
  defaults: {
    route: {
      url: '',
    },
  },
})

export class RouteState {
  // Fetch route state from store
  @Selector()
  static getRoute(state: RouteStateModel) {
    return state.route;
  }

  // Add route state in store
  @Action(AddRoute)
  add(
    { getState, patchState }: StateContext<RouteStateModel>,
    { payload }: AddRoute
  ) {
    const state = getState();
    patchState({
      route: {
        url: payload.url,
      },
    });
  }

  // Update route state in store
  @Action(UpdateRoute)
  put(
    { getState, setState }: StateContext<RouteStateModel>,
    { payload }: UpdateRoute
  ) {
    const state = getState();
  }
}
