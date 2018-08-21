import * as React from 'react';
import { KeycodeEnum } from '../enums/KeycodeEnum';

interface IProps {
    buttonText: string;
    onEnter: ( strMess: string ) => void;
    isEnabled: boolean;
    startInputWord?: string | null;
}

interface IState {
    
}

class InputForm extends React.Component<IProps, IState> {
    // is this anti pattern? i don't know other way.
    private inputName: HTMLInputElement | null;

    constructor(props : IProps){
        super(props);
    }

    componentDidMount() {
        if( this.inputName && this.props.startInputWord ) {
            this.inputName.value = this.props.startInputWord;
        }
    } 

    render() {
        const onClickButton = () => {
            if( !this.inputName )  return;

            this.checkInputText( this.inputName.value );
        }

        return(
            <div>
                <input 
                type="text"
                ref={ (t) => this.inputName = t } 
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
