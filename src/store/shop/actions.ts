import {
    ISetProductFilterMinPrice,
    ISetProductFilterMaxPrice,
    ISetProductFilterCheckBox,
    IResetProductFilters,
} from './types/actions';

import {ShopAction} from './shopActionEnum';
import { IProductFilterKey } from '../../types/filter';

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
