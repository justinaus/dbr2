import { UserAction, UserActionTypes } from "../actions/userAction";
import { IUserState } from "../states/IUserState";

const initialState: IUserState = {
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