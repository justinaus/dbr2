import * as React from 'react';
import { SizeEnum } from '../size';
import { getStyleButtonTypeSubmit } from './buttonTypeSubmit';
import { getStyleButtonTypeOutline } from './buttonTypeOutline';

export enum ButtonTypeEnum {
    SUBMIT,
    OUTLINE
}

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string;
    isEnabled: boolean;
    buttonType: ButtonTypeEnum;
    size?: SizeEnum;
    cssProperty?: any;
}

class Button extends React.Component<IProps, {}> {
    render() {
        const { text, isEnabled, buttonType, size, cssProperty, ...props } = this.props;

        return(
            <button 
                style={ this.getStyleByProps() } 
                disabled={ !this.props.isEnabled }
                { ...props }
            >
                {this.props.text}
            </button>
        );
    }

    private getStyleByProps = (): any => {
        let retStyle: any;
        
        switch( this.props.buttonType ) {
            case ButtonTypeEnum.SUBMIT :
                retStyle = getStyleButtonTypeSubmit( this.props.size );
                break;
            case ButtonTypeEnum.OUTLINE :
                retStyle = getStyleButtonTypeOutline();
                break;
            default :
                retStyle = {};
                break;
        }

        if( this.props.cssProperty ) {
            retStyle = Object.assign( retStyle, this.props.cssProperty );
        }

        return retStyle;
    }
}

export default Button;
