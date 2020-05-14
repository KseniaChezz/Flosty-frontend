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

export interface IDeleteProduct {
    type: basketAction.BASKET_DELETE_PRODUCT;
    shopId: number;
    productId: number;
}

export interface IUpdateProductQuantity {
    type: basketAction.BASKET_UPDATE_PRODUCT_QUANTITY;
    shopId: number;
    productId: number;
    productQuantity: number;
}

export type IBasketAction = ISetListIsLoading
    | ISetDataIsProcessing
    | ISetList
    | IAddProduct
    | IDeleteProduct
    | IUpdateProductQuantity
