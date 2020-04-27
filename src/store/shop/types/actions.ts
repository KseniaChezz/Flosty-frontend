import {ShopAction} from '../shopActionEnum'
import {IShop} from '../../../types/shop'

export interface IAddShop {
    type: ShopAction.SHOP_ADD;
    shop: IShop;
}

export interface ISetShopList {
    type: ShopAction.SHOP_SET_LIST;
    list: IShop[];
}

export interface ISetIsLoading {
    type: ShopAction.SHOP_SET_IS_LOADING;
    isLoading: boolean;
}

export type IShopAction = IAddShop
    | ISetShopList
    | ISetIsLoading;
