import {
    ISetShopList,
    ISetIsLoading,
    IAddShop,
} from './types/actions';

import {ShopAction} from './shopActionEnum';

import {IShop} from '../../types/shop';

export const addShop = (shop: IShop): IAddShop => {
    return {
        type: ShopAction.SHOP_ADD,
        shop,
    };
};

export const setShopList = (list: IShop[]): ISetShopList => {
    return {
        type: ShopAction.SHOP_SET_LIST,
        list,
    };
};

export const setShopIsLoading = (isLoading: boolean): ISetIsLoading => {
    return {
        type: ShopAction.SHOP_SET_IS_LOADING,
        isLoading,
    };
};
