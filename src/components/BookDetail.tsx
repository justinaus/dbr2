import * as React from 'react';
import { BookState } from '../states/BookState';
import { RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps<BookDetail> {
    bookState: BookState;
}

class BookDetail extends React.Component<IProps>{
    constructor( props: IProps ) {
        super( props );
    }

    render() {
        const bookState: BookState = this.props.bookState;

        return(
            <div>
                <img src={ bookState.cover_l_url }/>
                <h1>{ bookState.title }</h1>
                <h1>{ bookState.pub_nm }</h1>
            </div>
        );
    }
}

export default BookDetail;