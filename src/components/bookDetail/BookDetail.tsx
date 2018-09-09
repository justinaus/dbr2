import * as React from 'react';
import { BookState } from '../../states/BookState';
import { RouteComponentProps } from 'react-router';
import { saveRent } from '../../firebase/db';
import { IUserState } from '../../states/IUserState';
import * as moment from 'moment';
import Button, { ButtonTypeEnum } from '../../ui-components/button/Button';
import { SizeEnum } from '../../ui-components/size';

import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

interface IProps extends RouteComponentProps<BookDetail> {
    bookState: BookState;
    userState: IUserState;
}

interface IState {
    selectedDateMoment: moment.Moment;
    isEnabled: boolean;
    focused:boolean
}

class BookDetail extends React.Component<IProps, IState>{
    constructor( props: IProps ) {
        super( props );

        this.state = { isEnabled: true, selectedDateMoment: moment(), focused: false };
    }

    handleChange = (dateMoment: moment.Moment) => {
        this.setState({
            selectedDateMoment: dateMoment
        });
    }

    onFocusChanged = ( obj: { focused: boolean | null } ) => {
        this.setState({
            focused: obj.focused ? obj.focused : false
        });
    }

    render() {
        const bookState: BookState = this.props.bookState;

        return(
            <div>
                <img src={ bookState.cover_l_url }/>
                <h1>{ bookState.title }</h1>
                <h1>{ bookState.pub_nm }</h1>
                <SingleDatePicker
                    date={this.state.selectedDateMoment} // momentPropTypes.momentObj or null
                    onDateChange={ this.handleChange } // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={ this.onFocusChanged } // PropTypes.func.isRequired
                    id="justinkoo" // PropTypes.string.isRequired,
                    numberOfMonths={ 1 }
                    isOutsideRange={() => false}
                    noBorder={ true }
                />
                <Button
                buttonType={ ButtonTypeEnum.SUBMIT }
                text="반납" 
                size={ SizeEnum.MIDDLE } 
                onClick={this.onClickReturnBook}
                isEnabled={this.state.isEnabled}
                cssProperty={ { display: 'block' } }
                />
                <Button 
                buttonType={ ButtonTypeEnum.SUBMIT }
                text="대여" 
                size={ SizeEnum.MIDDLE } 
                onClick={this.onClickRentBook}
                isEnabled={this.state.isEnabled}
                />
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