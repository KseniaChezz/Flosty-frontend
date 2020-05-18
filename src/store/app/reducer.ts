import {IAppState} from './types/state';
import {IAppAction} from './types/actions';

import {AppAction} from './appActionEnum';
import {AppTab} from '../../enums';

const initialState: IAppState = {
    selectedTab: AppTab.MAIN,
    isDataProcessing: false,
    isError: false,
    errorText: '',
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
        case AppAction.APP_SET_ERROR: {
            return {
                ...state,
                isError: true,
                errorText: action.error,
            }
        };
        case AppAction.APP_RESET_ERROR:
        case AppAction.APP_SET_DEFAULT:
            return {
                ...state,
                isError: false,
                errorText: '',
            }
        default:
            return state;
    }
}
