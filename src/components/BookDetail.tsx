import * as React from 'react';
import { BookState } from '../states/BookState';
import { RouteComponentProps } from 'react-router';
import { saveRent } from '../firebase/db';
import { IUserState } from '../states/IUserState';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface IProps extends RouteComponentProps<BookDetail> {
    bookState: BookState;
    userState: IUserState;
}

interface IState {
    selectedDateMoment: moment.Moment;
    isEnabled: boolean;
}

class BookDetail extends React.Component<IProps, IState>{
    constructor( props: IProps ) {
        super( props );

        this.state = { isEnabled: true, selectedDateMoment: moment() };
    }

    handleChange = (dateMoment: moment.Moment) => {
        this.setState({
            selectedDateMoment: dateMoment
        });
      }

    render() {
        const bookState: BookState = this.props.bookState;

        return(
            <div>
                <img src={ bookState.cover_l_url }/>
                <h1>{ bookState.title }</h1>
                <h1>{ bookState.pub_nm }</h1>
                <DatePicker
                    selected={this.state.selectedDateMoment}
                    onChange={this.handleChange}
                />
                <button onClick={this.onClickReturnBook} disabled={!this.state.isEnabled}>반납</button>
                <button onClick={this.onClickRentBook} disabled={!this.state.isEnabled}>대여</button>
            </div>
        );
    }

    private onClickReturnBook = ( e: React.MouseEvent<HTMLButtonElement> ) => {
        this.saveData( true, this.state.selectedDateMoment.toDate() );
    }

    private onClickRentBook = ( e: React.MouseEvent<HTMLButtonElement> ) => {
        this.saveData( false, this.state.selectedDateMoment.toDate() );
    }

    private saveData = ( isReturningBook: boolean, date: Date ) => {
        this.setState( { isEnabled: false } );
    
        saveRent( isReturningBook, this.props.bookState.id, this.props.userState.ldap, date )
        .then( ( docRef: any ) => {
          alert( "save complete!" );
    
          this.setState( { isEnabled: true } );
        } )
        .catch( ( error ) => {
          alert( "save failed!" );

          this.setState( { isEnabled: true } );
        } );
      }
}

export default BookDetail;