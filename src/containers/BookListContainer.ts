import { connect } from 'react-redux';
import { IStoreState } from '../reducers';
import { Dispatch } from 'redux';
import BookList from '../components/BookList';

export function mapStateToProps( state: IStoreState) {
  return {
    
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);