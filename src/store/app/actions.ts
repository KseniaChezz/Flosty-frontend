import {AppAction} from './appActionEnum';
import {AppTab} from '../../enums';
import {
    ISetAppTabAction,
    ISetIsDataProcessingAction,
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
