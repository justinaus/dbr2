import * as React from 'react';
import './BookItem.css'
import { BookState } from '../../../states/BookState';
import LazyLoad from 'react-lazyload';

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
        const IMAGE_HEIGHT:number = 60;

        return(
            <div 
                className='bookItemContainer'
                onClick={ this.onClick } 
            >
                <LazyLoad height={ IMAGE_HEIGHT }>
                    <img src={ bookState.cover_s_url } height={ IMAGE_HEIGHT }/>
                </LazyLoad>
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