import { connect } from 'react-redux';
import { IStoreState } from '../reducers';
import { Dispatch } from 'redux';
import App from '../App';

export function mapStateToProps( state: IStoreState) {
  return {
    userState: state.userState,
    books: state.bookState
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);