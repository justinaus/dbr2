import { combineReducers, Reducer } from "redux";
import { reduceUserState } from "./userReducer";
import { IUserState } from "../states/IUserState";
import { BookState } from "../states/BookState";
import { reduceBookState } from "./bookReducer";

export interface IStoreState {
  bookState: BookState[] | null,
  userState: IUserState
}

export const rootReducer: Reducer<IStoreState> = combineReducers({
  bookState: reduceBookState,
  userState: reduceUserState
} );
