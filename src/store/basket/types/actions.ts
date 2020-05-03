import {basketAction} from '../basketActionEnum';

import {IShopInfoAndBasketProduct} from './state';

export interface ISetListIsLoading {
    type: basketAction.BASKET_SET_LIST_IS_LOADING;
    isLoading: boolean;
}

export interface ISetDataIsProcessing {
    type: basketAction.BASKET_SET_DATA_IS_PROCESSING;
    isDataProcessing: boolean;
}

export interface ISetList {
    type: basketAction.BASKET_SET_LIST;
    list: IShopInfoAndBasketProduct[];
}

export interface IAddProduct {
    type: basketAction.BASKET_ADD_PRODUCT;
    product: IShopInfoAndBasketProduct;
}

export type IBasketAction = ISetListIsLoading
    | ISetDataIsProcessing
    | ISetList
    | IAddProduct
