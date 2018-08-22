import { connect } from 'react-redux';
import { IStoreState } from '../reducers';
import { Dispatch } from 'redux';
import { createLogInAction } from '../actions/userAction';
import Entrance from '../components/Entrance';
import { saveUserState } from '../localStorage';

export function mapStateToProps( state: IStoreState) {
  return {
    
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onLoggedIn: ( ldap: string, token: string ) => {
      saveUserState( { isLoggedIn: true, ldap: ldap, token: token } );

      dispatch( createLogInAction( ldap, token ) )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Entrance);