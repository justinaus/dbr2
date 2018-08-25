export enum UserActionTypes {
    LOG_IN = 'userActionLogIn'
}

export interface ILogInAction {
    type: UserActionTypes.LOG_IN;
    ldap: string,
    token: string
}

export type UserAction = ILogInAction;

export function createLogInAction( ldap: string, token: string ): ILogInAction {
    return {
        type: UserActionTypes.LOG_IN,
        ldap: ldap,
        token: token
    };
}

