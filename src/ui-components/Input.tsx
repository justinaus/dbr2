import * as React from 'react';

interface IProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    isEnabled: boolean;
    onEnterKey?: () => void;
    cssProperty?: any;
}

class Input extends React.Component<IProps, {}> {
    constructor( props: IProps ) {
        super( props );
    }

    render() {
        const { isEnabled, onEnterKey, cssProperty, ...props } = this.props;

        return(
            <input
                type="text"
                style={ this.getStyleByProps() } 
                onKeyUp={ this.onKeyUpHandler }
                disabled={ !this.props.isEnabled }
                { ...props } 
            />
        );
    }

    private onKeyUpHandler = ( e: React.KeyboardEvent ) => {
        if( !this.props.isEnabled ) return;
        if( !this.props.onEnterKey )    return;

        const KEY_CODE_ENTER: number = 13;
        if( e.keyCode != KEY_CODE_ENTER )    return;

        this.props.onEnterKey();
    }

    private getStyleByProps = (): any => {
        let retStyle: any = {
            width: 100,
            height: 40,
            color: '#777777',
            fontSize: 16,
            fontFamily: 'AppleSDGothicNeo-Regular',
            padding: '0px 10px 0px 10px',
            border: 0,
            borderRadius: 2,
            boxShadow: "0 0 0 1px #cccccc inset",
        }
    
        if( this.props.cssProperty ) {
            retStyle = Object.assign( retStyle, this.props.cssProperty );
        }

        return retStyle;
    }
}

export default Input;
