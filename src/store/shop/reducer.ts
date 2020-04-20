import {IShopState} from './types/state';

import {TEXT} from '../../constants';
import {ShopAction} from './shopActionEnum';

import {
    ISetProductFilterMinPrice,
    ISetProductFilterMaxPrice,
    ISetProductFilterCheckBox,
    IResetProductFilters,
    IShopAction,
} from './types/actions';
import { IProductFilter } from '../../types/filter';

const getInitialFilters = (): IProductFilter => {
    return {
        sorting: TEXT.default,
        category: TEXT.allCategories,
        season: TEXT.allSeasons,
        maxPrice: '',
        minPrice: '',
    };
}

const initialState: IShopState = {
    filter: getInitialFilters(),
};

const onSetProductFilterMinPrice = (state: IShopState, action: ISetProductFilterMinPrice): IShopState => {
    const {price} = action;

    return {
        ...state,
        filter: {
           ...state.filter,
           minPrice: price,
        },
    }
};

const onSetProductFilterMaxPrice = (state: IShopState, action: ISetProductFilterMaxPrice): IShopState => {
    const {price} = action;

    return {
        ...state,
        filter: {
            ...state.filter,
            maxPrice: price,
        },
    }
};

const onSetProductFilterCheckBox = (state: IShopState, action: ISetProductFilterCheckBox): IShopState => {
    const {filterName, value} = action;

    return {
        ...state,
        filter: {
            ...state.filter,
            [filterName]: value,
        },
    }
};

const onResetProductFilters = (state: IShopState, action: IResetProductFilters): IShopState => {
    return {
        ...state,
        filter: getInitialFilters(),
    }
};

export const shopReducer = (state: IShopState = initialState, action: IShopAction): IShopState => {
    switch (action.type) {
        case ShopAction.SHOP_PRODUCT_FILTER_SET_MIN_PRICE:
            return onSetProductFilterMinPrice(state, action);
        case ShopAction.SHOP_PRODUCT_FILTER_SET_MAX_PRICE:
            return onSetProductFilterMaxPrice(state, action);
        case ShopAction.SHOP_PRODUCT_FILTER_SET_CHECKBOX:
            return onSetProductFilterCheckBox(state, action);
        case ShopAction.SHOP_PRODUCT_FILTER_RESET:
            return onResetProductFilters(state, action);
        default:
            return state;
    }
}
