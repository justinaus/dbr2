import { combineReducers, Reducer } from "redux";
import { reduceUserState } from "./userReducer";
import { IUserState } from "../states/IUserState";

export interface IStoreState {
  userState: IUserState
}

export const rootReducer: Reducer<IStoreState> = combineReducers({
  userState: reduceUserState
} );
