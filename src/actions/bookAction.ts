import { BookState } from "../states/BookState";

export enum BookActionTypes {
    CHANGE_BOOK_LIST = 'bookActionChangeBookList'
}

export interface IChangeBookListAction {
    type: BookActionTypes.CHANGE_BOOK_LIST;
    books: BookState[]
}

export type BookAction = IChangeBookListAction;

export function createChangeBookListAction( booksData: BookState[] ): IChangeBookListAction {
    return {
        type: BookActionTypes.CHANGE_BOOK_LIST,
        books: booksData
    };
}

