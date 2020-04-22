import {
    ISetProductFilterMinPrice,
    ISetProductFilterMaxPrice,
    ISetProductFilterCheckBox,
    IResetProductFilters,
    ISetShopList,
    ISetIsLoading,
    IAddShop,
} from './types/actions';

import {ShopAction} from './shopActionEnum';

import {IProductFilterKey} from '../../types/filter';
import {IShop} from '../../types/shop';

export const setProductFilterMinPrice = (price: string): ISetProductFilterMinPrice => {
    return {
        type: ShopAction.SHOP_PRODUCT_FILTER_SET_MIN_PRICE,
        price,
    };
};

export const setProductFilterMaxPrice = (price: string): ISetProductFilterMaxPrice => {
    return {
        type: ShopAction.SHOP_PRODUCT_FILTER_SET_MAX_PRICE,
        price,
    };
};

export const setProductFilterCheckBox = (
    filterName: IProductFilterKey,
    value: string,
): ISetProductFilterCheckBox => {
    return {
        type: ShopAction.SHOP_PRODUCT_FILTER_SET_CHECKBOX,
        filterName,
        value,
    };
};

export const resetProductFilters = (): IResetProductFilters => {
    return {
        type: ShopAction.SHOP_PRODUCT_FILTER_RESET,
    };
};

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
