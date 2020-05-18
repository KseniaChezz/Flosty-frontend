import {AppAction} from './appActionEnum';
import {AppTab} from '../../enums';
import {
    ISetAppTabAction,
    ISetIsDataProcessingAction,
    ISetDefaultAction,
    ISetErrorAction,
    IResetErrorAction,
} from './types/actions';

export const setAppTab = (tab: AppTab): ISetAppTabAction => {
    return {
        type: AppAction.APP_SET_TAB,
        tab,
    };
};

export const setIsDataProcessing = (isProcessing: boolean): ISetIsDataProcessingAction => {
    return {
        type: AppAction.APP_SET_IS_DATA_PROCESSING,
        isProcessing,
    };
};

export const setError = (error: string): ISetErrorAction => {
    return {
        type: AppAction.APP_SET_ERROR,
        error,
    };
};

export const resetError = (): IResetErrorAction => {
    return {
        type: AppAction.APP_RESET_ERROR,
    };
};

export const setDefault = (): ISetDefaultAction => {
    return {
        type: AppAction.APP_SET_DEFAULT,
    };
};
