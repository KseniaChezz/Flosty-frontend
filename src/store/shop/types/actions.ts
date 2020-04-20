import {ShopAction} from '../shopActionEnum'
import {IProductFilterKey} from '../../../types/filter'
import {IShop} from '../../../types/shop'

export interface ISetProductFilterMinPrice {
    type: ShopAction.SHOP_PRODUCT_FILTER_SET_MIN_PRICE;
    price: string;
}

export interface ISetProductFilterMaxPrice {
    type: ShopAction.SHOP_PRODUCT_FILTER_SET_MAX_PRICE;
    price: string;
}

export interface ISetProductFilterCheckBox {
    type: ShopAction.SHOP_PRODUCT_FILTER_SET_CHECKBOX;
    filterName: IProductFilterKey;
    value: string;
}

export interface IResetProductFilters {
    type: ShopAction.SHOP_PRODUCT_FILTER_RESET,
}

export interface IAddShop {
    type: ShopAction.SHOP_ADD;
    shop: IShop;
}

export type IShopAction = ISetProductFilterMinPrice
    | ISetProductFilterMaxPrice
    | ISetProductFilterCheckBox
    | IResetProductFilters
    | IAddShop