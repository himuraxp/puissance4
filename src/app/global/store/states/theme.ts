import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Theme, AddTheme, UpdateTheme } from '../../models/theme';

export class ThemeStateModel {
  theme: Theme = {
    color: 'dark'
  };
}

// State metadata initialization
@State<ThemeStateModel>({
  name: 'Theme',
  defaults: {
    theme: {
        color: 'dark'
    }
  },
})

export class ThemeState {
  // Fetch theme state from store
  @Selector()
  static getTheme(state: ThemeStateModel) {
    return state.theme;
  }

  // Add theme state in store
  @Action(AddTheme)
  add(
    { getState, patchState }: StateContext<ThemeStateModel>,
    { payload }: AddTheme
  ) {
    const state = getState();
    patchState({
      theme: payload,
    });
  }

  // Update theme state in store
  @Action(UpdateTheme)
  put(
    { getState, setState }: StateContext<ThemeStateModel>,
    { payload }: UpdateTheme
  ) {
    const state = getState();
  }
}