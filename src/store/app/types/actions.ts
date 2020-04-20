import {AppAction} from '../appActionEnum';
import {AppTab} from '../../../enums';

export interface ISetAppTabAction {
    type: AppAction.APP_SET_TAB;
    tab: AppTab;
}

export type IAppAction = ISetAppTabAction;
