import {basketAction} from './basketActionEnum';

import {IBasketAction, ISetDataIsProcessing, ISetList, ISetListIsLoading} from './types/actions';
import {IBasketState} from './types/state';

const initialState: IBasketState = {
    list: [],
    isListLoading: false,
    isDataProcessing: false,
}

const onSetDataIsProcessing = (state: IBasketState, action: ISetDataIsProcessing): IBasketState => {
    const {isDataProcessing} = action;

    return {
        ...state,
        isDataProcessing,
    }
}

const onSetListIsLoading = (state: IBasketState, action: ISetListIsLoading): IBasketState => {
    const {isLoading} = action;

    return {
        ...state,
        isListLoading: isLoading,
    }
}

const onSetList = (state: IBasketState, action: ISetList): IBasketState => {
    const {list} = action;

    return {
        ...state,
        list,
    }
}

export const basketReducer = (state: IBasketState = initialState, action: IBasketAction): IBasketState => {
    switch (action.type) {
        case basketAction.BASKET_SET_DATA_IS_PROCESSING:
            return onSetDataIsProcessing(state, action);
        case basketAction.BASKET_SET_LIST_IS_LOADING:
            return onSetListIsLoading(state, action);
        case basketAction.BASKET_SET_LIST:
            return onSetList(state, action);
        default:
            return state;
    }
}
