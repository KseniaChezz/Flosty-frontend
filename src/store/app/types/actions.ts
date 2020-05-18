import {AppAction} from '../appActionEnum';
import {AppTab} from '../../../enums';

export interface ISetAppTabAction {
    type: AppAction.APP_SET_TAB;
    tab: AppTab;
}

export interface ISetIsDataProcessingAction {
    type: AppAction.APP_SET_IS_DATA_PROCESSING;
    isProcessing: boolean;
}

export interface ISetErrorAction {
    type: AppAction.APP_SET_ERROR;
    error: string;
}

export interface IResetErrorAction {
    type: AppAction.APP_RESET_ERROR;
}

export interface ISetDefaultAction {
    type: AppAction.APP_SET_DEFAULT;
}

export type IAppAction = ISetAppTabAction
    | ISetIsDataProcessingAction
    | ISetDefaultAction
    | ISetErrorAction
    | IResetErrorAction;
