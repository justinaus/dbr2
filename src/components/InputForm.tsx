import * as React from 'react';
import { KeycodeEnum } from '../enums/KeycodeEnum';

interface IProps {
    buttonText: string;
    onEnter: ( strMess: string ) => void;
    isEnabled: boolean;
}

interface IState {
    
}

class InputForm extends React.Component<IProps, IState> {
    constructor(props : IProps){
        super(props);
    }

    render() {
        let inputName: HTMLInputElement | null;

        const onClickButton = () => {
            if( !inputName )  return;

            this.checkInputText( inputName.value );
        }

        return(
            <div>
                <input 
                type="text"
                ref={ (t) => inputName = t } 
                onKeyUp={ this.onKeyUpHandler }
                disabled={ !this.props.isEnabled } />
                <br/>
                <button onClick={ onClickButton } disabled={!this.props.isEnabled}>{ this.props.buttonText }</button>
            </div> 
        );
    }

    private onKeyUpHandler = ( e: React.KeyboardEvent ) => {
        if( e.keyCode != KeycodeEnum.ENTER )  return;

        const input: HTMLInputElement = e.target as HTMLInputElement;
        this.checkInputText( input.value );
    }

    private checkInputText = ( strInput: string ) => {
        if( !this.props.isEnabled )  return;

        this.props.onEnter( strInput );
    }
}

export default InputForm;
