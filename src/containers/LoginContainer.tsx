import { connect } from 'react-redux';
import { IStoreState } from '../reducers';
import { Dispatch } from 'redux';
import { createLogInAction } from '../actions/userAction';
import Login from '../components/login/Login';
import { saveUserStateToLocalStorage } from '../localStorage';

export function mapStateToProps( state: IStoreState) {
  return {
    
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onLoggedIn: ( ldap: string, token: string ) => {
      saveUserStateToLocalStorage( { ldap: ldap, token: token } );

      dispatch( createLogInAction( ldap, token ) )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);