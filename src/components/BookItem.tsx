import * as React from 'react';
import { BookState } from '../states/BookState';

interface IProps {
    bookState: BookState;
    onClick: ( bookState: BookState ) => void;
}

class BookItem extends React.Component<IProps>{
    constructor( props: IProps ) {
        super( props );
    }

    render() {
        const bookState: BookState = this.props.bookState;

        return(
            <div onClick={ this.onClick }>
                <img src={ bookState.cover_s_url } height='60'/>
                <h6>{ bookState.title }</h6>
                <h6>{ bookState.pub_nm }</h6>
            </div>
        );
    }

    private onClick = ( e: React.MouseEvent<HTMLElement> ) => {
        this.props.onClick( this.props.bookState );
    }
}

export default BookItem;