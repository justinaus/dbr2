import { connect } from 'react-redux';
import { IStoreState } from '../reducers';
import { Dispatch } from 'redux';
import { createLogInAction } from '../actions/userAction';
import Entrance from '../components/Entrance';

export function mapStateToProps( state: IStoreState) {
  return {
    
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onLoggedIn: ( ldap: string, token: string ) => {
      dispatch( createLogInAction( ldap, token ) )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Entrance);