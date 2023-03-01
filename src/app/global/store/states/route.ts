import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Route, AddRoute, UpdateRoute } from '../../models/route';

export class RouteStateModel {
  route: Route = {
    url: '',
  };
}

@State<RouteStateModel>({
  name: 'Route',
  defaults: {
    route: {
      url: '',
    },
  },
})
export class RouteState {
  @Selector()
  static getRoute(state: RouteStateModel) {
    return state.route;
  }

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

  @Action(UpdateRoute)
  put(
    { getState, setState }: StateContext<RouteStateModel>,
    { payload }: UpdateRoute
  ) {
    const state = getState();
  }
}
