export enum SearchActionTypes {
    SAVE_WORD_SEARCHED = 'searchActionSaveWordSearched'
}

export interface ISaveWordSearchedAction {
    type: SearchActionTypes.SAVE_WORD_SEARCHED;
    wordSearched: string
}

export type SearchAction = ISaveWordSearchedAction;

export function createSaveWordSearchedAction( wordSearched: string ): ISaveWordSearchedAction {
    return {
        type: SearchActionTypes.SAVE_WORD_SEARCHED,
        wordSearched: wordSearched
    };
}