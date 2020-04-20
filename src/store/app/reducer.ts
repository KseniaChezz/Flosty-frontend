import {IAppState} from './types/state';
import {IAppAction} from './types/actions';

import {AppAction} from './appActionEnum';
import {AppTab} from '../../enums';

const initialState: IAppState = {
    selectedTab: AppTab.MAIN,
    isDataProcessing: false,
}

export const appReducer = (state: IAppState = initialState, action: IAppAction): IAppState => {
    switch (action.type) {
        case AppAction.APP_SET_TAB:
            return {
                ...state,
                selectedTab: action.tab,
            };
        case AppAction.APP_SET_IS_DATA_PROCESSING:
            return {
                ...state,
                isDataProcessing: action.isProcessing,
            };
        default:
            return state;
    }
}
