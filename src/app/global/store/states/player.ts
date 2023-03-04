import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Player, AddPlayer, UpdatePlayer, DeletePlayer } from '../../models/player';

export class PlayerStateModel {
  players: Player[] = [];
}

// State metadata initialization
@State<PlayerStateModel>({
  name: 'Players',
  defaults: {
    players: [],
  },
})

export class PlayerState {
  // Fetch player state from store
  @Selector()
  static getPlayers(state: PlayerStateModel) {
    return state.players;
  }

  // Add player state in store
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

  // Update player state in store
  @Action(UpdatePlayer)
  put(
    { getState, setState }: StateContext<PlayerStateModel>,
    { payload }: UpdatePlayer
  ) {
    const state = getState();
  }

  // Delete players state in store
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
