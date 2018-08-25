import { SearchAction, SearchActionTypes } from "../actions/searchAction";

export function reduceWordSearched(state: string | null = null, action: SearchAction): string | null {
  switch (action.type) {
    case SearchActionTypes.SAVE_WORD_SEARCHED:
      return action.wordSearched;
    default:
      return state;
  }
}