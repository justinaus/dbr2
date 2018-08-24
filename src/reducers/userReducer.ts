import { UserAction, UserActionTypes } from "../actions/userAction";
import { IUserState } from "../states/IUserState";
import { loadUserState } from "../localStorage";

const initialState: IUserState | null = loadUserState();

export function reduceUserState(state: IUserState | null = initialState, action: UserAction): IUserState | null {
  switch (action.type) {
    case UserActionTypes.LOG_IN:
      return { ...state, ldap: action.ldap, token: action.token };
    default:
      return state;
  }
}