import { SizeEnum, ISize } from "../size";

const getSize = ( sizeEnum?: SizeEnum ): ISize => {
    let ret: ISize;

    switch( sizeEnum ) {
        case SizeEnum.LARGE :
            ret = { width: 330, height: 60 };
            break;
        case SizeEnum.SMALL :
            ret = { width: 110, height: 40 };
            break;
        default :
            ret = { width: 220, height: 50 };
    }
    return ret;
}

export const getStyleButtonTypeSubmit = ( sizeEnum?: SizeEnum ): any => {
    const size: ISize = getSize( sizeEnum );

    return (
        {
            background: '#383838',
            borderRadius: 2,
            fontSize: 16,
            color: '#FFFFFF',
            width: size.width,
            height: size.height,
            fontFamily: 'AppleSDGothicNeo-Bold',
        }
    );
}