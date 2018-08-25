import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { RouterPathEnum } from '../enums/RouterPathEnum';
import { API_HEIMDALL_URL } from '../config';
import InputForm from './InputForm';

interface IProps extends RouteComponentProps<Login> {
  onLoggedIn: ( ldap: string, token: string ) => void;
}

interface IState {
  isEnabled: boolean
}

class Login extends React.Component<IProps, IState> {
  constructor(props : IProps){
    super(props);

    this.state = { isEnabled: true };
  }

  render() {
    return(
        <div>
            enter token:<br/>
            <InputForm 
            buttonText="log in" 
            onEnter={this.onEnterInputText}
            isEnabled={this.state.isEnabled}
            />
        </div> 
    );
  }

  private onEnterInputText = ( strInput: string ) => {
    if( !strInput ) {
      alert( "enter your token" );  
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
