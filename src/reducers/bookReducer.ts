import { BookActionTypes, BookAction } from '../actions/bookAction';
import { BookState } from '../states/BookState';

export function reduceBookState(state: BookState[] | null = null, action: BookAction): BookState[] | null {
  switch (action.type) {
    case BookActionTypes.CHANGE_BOOK_LIST:
      state = action.books.slice( 0 );
      return state;
    default:
      return state;
  }
}