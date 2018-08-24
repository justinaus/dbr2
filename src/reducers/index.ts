import { combineReducers, Reducer } from "redux";
import { reduceUserState } from "./userReducer";
import { IUserState } from "../states/IUserState";
import { BookState } from "../states/BookState";
import { reduceBookState } from "./bookReducer";
import { reduceWordSearched } from "./searchReducer";

export interface IStoreState {
  bookState: BookState[] | null,
  userState: IUserState | null,
  wordSearched: string | null
}

export const rootReducer: Reducer<IStoreState> = combineReducers({
  bookState: reduceBookState,
  userState: reduceUserState,
  wordSearched : reduceWordSearched
} );
