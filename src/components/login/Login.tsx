import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import { API_HEIMDALL_URL } from '../../config';
import './Login.css';
import Input from '../../ui-components/Input';
import Button, { ButtonTypeEnum } from '../../ui-components/button/Button';

interface IProps extends RouteComponentProps<Login> {
  onLoggedIn: ( ldap: string, token: string ) => void;
}

interface IState {
  isEnabled: boolean
}

class Login extends React.Component<IProps, IState> {
  private currentText: string = "";

  constructor(props : IProps){
    super(props);

    this.state = { isEnabled: true };
  }

  render() {
    return(
        <div className="loginContainer">
          <div className="box">
            <h3>토큰</h3>
            <div>
                <Input
                    isEnabled={ this.state.isEnabled }
                    onEnterKey={ () => this.onSubmitInputText( this.currentText ) }
                    cssProperty={ { display: 'block', width: '180px', marginTop: '10px' } }
                    onChange={ this.onChangeInputHandler }
                />
                <Button
                    buttonType={ ButtonTypeEnum.SUBMIT }
                    text="로그인"
                    onClick={ () => this.onSubmitInputText( this.currentText ) }
                    cssProperty={ { width: '100%', marginTop: '20px' } }
                    isEnabled={this.state.isEnabled}
                />
            </div> 
          </div>
        </div> 
    );
  }

  private onChangeInputHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    this.currentText = e.currentTarget.value;
  }

  private onSubmitInputText = ( strInput: string ) => {
    if( !strInput.trim() ) {
      alert( "올바른 토큰을 입력해주세요." );  
      return;
    }

    this.setState( { isEnabled: false } );

    if( process.env.REACT_APP_INTERNAL === "true" ) {
      this.getUserDataByToken( strInput );
    } else {
      const fakeDataForTest: any = {
        status: "success",
        ldap: "justin.koo"
      }

      this.onCompleteLoadJson( fakeDataForTest, strInput );
    }
  }

  private getUserDataByToken = ( strInput: string ) => {
    fetch( API_HEIMDALL_URL + strInput).then( ( response ) => {
      return response.json();
    }).then( ( data ) => {
      this.onCompleteLoadJson( data, strInput );
    }).catch( ( error ) => {
      console.log( error );
      alert( "login error" ); 
      this.setState( { isEnabled: true } );
    } );
  }

  private onCompleteLoadJson = ( data: any, strToken: string ) => {
    console.log( data );

    if( data.status == "success" ) {
      this.props.onLoggedIn( data.ldap, strToken );

      this.props.history.push( RouterPathEnum.HOME );
    } else {
      alert( "wrong token" ); 
      this.setState( { isEnabled: true } );
    }
  }
}

export default Login;
