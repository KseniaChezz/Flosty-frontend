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

export interface ISetDefaultAction {
    type: AppAction.APP_SET_DEFAULT;
}

export type IAppAction = ISetAppTabAction | ISetIsDataProcessingAction | ISetDefaultAction;
