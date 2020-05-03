import {basketAction} from './basketActionEnum';

import {ISetDataIsProcessing, ISetList, ISetListIsLoading, IAddProduct} from './types/actions';
import {IShopInfoAndBasketProduct} from './types/state';

export const setIsBasketListLoading = (isLoading: boolean): ISetListIsLoading => {
    return {
        type: basketAction.BASKET_SET_LIST_IS_LOADING,
        isLoading,
    }
}

export const setIsBasketDataProcessing = (isDataProcessing: boolean): ISetDataIsProcessing => {
    return {
        type: basketAction.BASKET_SET_DATA_IS_PROCESSING,
        isDataProcessing,
    }
}

export const setBasketList = (list: IShopInfoAndBasketProduct[]): ISetList => {
    return {
        type: basketAction.BASKET_SET_LIST,
        list,
    }
}
