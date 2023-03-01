import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Player, AddPlayer, UpdatePlayer, DeletePlayer } from '../../models/player';

export class PlayerStateModel {
  players: Player[] = [];
}

@State<PlayerStateModel>({
  name: 'Players',
  defaults: {
    players: [],
  },
})

export class PlayerState {
  @Selector()
  static getPlayer(state: PlayerStateModel) {
    return state.players;
  }

  @Action(AddPlayer)
  add(
    { getState, patchState }: StateContext<PlayerStateModel>,
    { payload }: AddPlayer
  ) {
    const state = getState();
    patchState({
      players: [...state.players, payload],
    });
  }

  @Action(UpdatePlayer)
  put(
    { getState, setState }: StateContext<PlayerStateModel>,
    { payload }: UpdatePlayer
  ) {
    const state = getState();
  }

  @Action(DeletePlayer)
  delete(
    { getState, patchState }: StateContext<PlayerStateModel>,
    { payload }: DeletePlayer
  ) {
    const state = getState();

    if (state.players.length > 0) {
      state.players = [];
    }
    return state;
  }
}
