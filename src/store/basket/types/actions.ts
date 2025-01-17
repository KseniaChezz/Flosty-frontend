import {basketAction} from '../basketActionEnum';

import {IShopInfoAndBasketProduct} from './state';
import {IAddress, ICard} from '../../../types/user';
import {IDeliveryType} from '../../../types/basket';

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

export interface IDeleteAllProducts {
    type: basketAction.BASKET_DELETE_ALL_PRODUCTS;
}

export interface IDeleteAllShopProducts {
    type: basketAction.BASKET_DELETE_ALL_SHOP_PRODUCTS;
    shopId: number;
}

export interface IDeleteShopProducts {
    type: basketAction.BASKET_DELETE_SHOP_PRODUCTS;
    shopId: number;
    productIdList: number[];
}

export interface IUpdateProductQuantity {
    type: basketAction.BASKET_UPDATE_PRODUCT_QUANTITY;
    shopId: number;
    productId: number;
    productQuantity: number;
}

export interface ISelectAddress {
    type: basketAction.BASKET_SELECT_ADDRESS;
    address: IAddress | undefined;
}

export interface ISelectCard {
    type: basketAction.BASKET_SELECT_CARD;
    card: ICard | undefined;
}

export interface ISetDeliveryTypeList {
    type: basketAction.BASKET_SET_DELIVERY_TYPE_LIST;
    deliveryTypeList: IDeliveryType[];
}

export interface ISelectDeliveryType {
    type: basketAction.BASKET_SELECT_DELIVERY_TYPE;
    deliveryType: IDeliveryType | undefined;
}

export interface ISetDeliveryPrice {
    type: basketAction.BASKET_SET_DELIVERY_PRICE;
    deliveryPrice: number;
}

export type IBasketAction = ISetListIsLoading
    | ISetDataIsProcessing
    | ISetList
    | IAddProduct
    | IDeleteProduct
    | IDeleteAllShopProducts
    | IDeleteShopProducts
    | IDeleteAllProducts
    | IUpdateProductQuantity
    | ISelectAddress
    | ISelectCard
    | ISetDeliveryTypeList
    | ISelectDeliveryType
    | ISetDeliveryPrice
