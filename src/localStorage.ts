import { IUserState } from "./states/IUserState";

export enum LocalStorageKey {
    USER_STATE = "userState"
}

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (err) {
    console.log( err );
  }
}

export const loadUserStateFromLocalStorage = () :IUserState | null => {
    try {
      const serializedState = localStorage.getItem( LocalStorageKey.USER_STATE )
      if (serializedState === null) {
        return null
      }
      return JSON.parse(serializedState)
    } catch (err) {
        console.log( err );
      return null
    }
  }
  
  export const saveUserStateToLocalStorage = ( state: IUserState ) => {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem( LocalStorageKey.USER_STATE, serializedState);
    } catch(err) {
        console.log( err );
    }
  }