import { connect } from 'react-redux';
import { IStoreState } from '../reducers';
import { Dispatch } from 'redux';
import BookList from '../components/BookList';
import { BookState } from '../states/BookState';
import { createChangeBookListAction } from '../actions/bookAction';
import { createSaveWordSearchedAction } from '../actions/searchAction';

export function mapStateToProps( state: IStoreState) {
  return {
    booksAll: state.bookState,
    wordSearched: state.wordSearched
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onBookListChanged: ( books: BookState[] ) =>  {
      dispatch( createChangeBookListAction( books ) )
    },
    onSaveWordSearched: ( wordSearched: string ) => {
      dispatch( createSaveWordSearchedAction( wordSearched ) )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);