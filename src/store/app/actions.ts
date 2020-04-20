import {AppAction} from './appActionEnum';
import {AppTab} from '../../enums';
import {ISetAppTabAction} from './types/actions';

export const setAppTab = (tab: AppTab): ISetAppTabAction => {
    return {
        type: AppAction.APP_SET_TAB,
        tab,
    };
};
