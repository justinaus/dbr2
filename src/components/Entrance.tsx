import * as React from 'react';
import { KeycodeEnum } from '../enums/KeycodeEnum';
import { RouteComponentProps } from 'react-router';
import { RouterPathEnum } from '../enums/RouterPathEnum';

interface Props extends RouteComponentProps<Entrance> {
  onLoggedIn: ( ldap: string, token: string ) => void;
}

interface State {
  isEnabled: boolean
}

class Entrance extends React.Component<Props, State> {
  constructor(props : Props){
    super(props);

    this.onKeyUpHandler = this.onKeyUpHandler.bind( this );
    this.tryToLogIn = this.tryToLogIn.bind( this );
    this.onCompleteLoadJson = this.onCompleteLoadJson.bind( this );

    this.state = { isEnabled: true };
  }

  render() {
    let inputName: HTMLInputElement | null;

    const onClickLogin = () => {
      if( !inputName )  return;

      this.tryToLogIn( inputName.value );
    }

    return(
        <div>
            enter token:<br/>
            <input 
              type="text"
              ref={ (t) => inputName = t } 
              onKeyUp={ this.onKeyUpHandler }
              disabled={ !this.state.isEnabled } />
            <br/>
            <button onClick={ onClickLogin } disabled={!this.state.isEnabled}>log in</button>
        </div> 
    );
  }

  private onKeyUpHandler( e: React.KeyboardEvent ): void {
    if( e.keyCode != KeycodeEnum.ENTER )  return;

    const input: HTMLInputElement = e.target as HTMLInputElement;
    this.tryToLogIn( input.value );
  }

  private tryToLogIn( strInput: string ): void {
    if( !this.state.isEnabled )  return;

    if( !strInput ) {
      alert( "put your token." );  
      return;
    }

    this.setState( { isEnabled: false } );
    
    fetch( process.env.REACT_APP_API_HEIMDALL_URL + "/token").then( ( response ) => {
      return response.json();
    }).then( ( data ) => {
      this.onCompleteLoadJson( data, strInput );
    }).catch( ( error ) => {
      console.log( error );
      alert( "error" ); 
      this.setState( { isEnabled: true } );
    } );
  }

  private onCompleteLoadJson( data: any, strToken: string ):void {
    if( data.status == "success" ) {
      this.props.onLoggedIn( data.ldap, strToken );

      this.props.history.push( RouterPathEnum.BOOK_LIST );
    } else {
      alert( "wrong token" ); 
      this.setState( { isEnabled: true } );
    }
  }
}

export default Entrance;
