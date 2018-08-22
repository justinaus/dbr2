import { UserAction, UserActionTypes } from "../actions/userAction";
import { IUserState } from "../states/IUserState";
import { loadUserState } from "../localStorage";

const userStateFromLocalStorage: IUserState | null = loadUserState();

const initialState: IUserState = userStateFromLocalStorage ? userStateFromLocalStorage : 
{
  isLoggedIn: false,
  ldap: '',
  token: ''
}

export function reduceUserState(state: IUserState = initialState, action: UserAction): IUserState {
  switch (action.type) {
    case UserActionTypes.LOG_IN:
      return { ...state, isLoggedIn: true, ldap: action.ldap, token: action.token };
    default:
      return state;
  }
}