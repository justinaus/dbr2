import * as React from 'react';
import { BookState } from '../states/BookState';

interface IProps {
    bookState: BookState;
    onClick: ( bookState: BookState ) => void;
    onCompleteRender?: ( item:BookItem, nHeight: number ) => void;
}

class BookItem extends React.Component<IProps>{
    private divElement: HTMLDivElement | null;

    constructor( props: IProps ) {
        super( props );
    }

    componentDidMount() {
        if( !this.props.onCompleteRender || !this.divElement ) {
            return;
        }

        this.props.onCompleteRender( this, this.divElement.clientHeight );
    }

    public hide = () => {
        if( !this.divElement ) {
            return;
        }

        this.divElement.hidden = true;
    }

    render() {
        const bookState: BookState = this.props.bookState;

        return(
            <div 
            ref={ (t) => this.divElement = t }
            onClick={ this.onClick } 
            >
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