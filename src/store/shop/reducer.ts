import {IShopState} from './types/state';

import {TEXT} from '../../constants';
import {ShopAction} from './shopActionEnum';

import {
    IAddShop,
    IResetProductFilters,
    ISetIsLoading,
    ISetProductFilterCheckBox,
    ISetProductFilterMaxPrice,
    ISetProductFilterMinPrice,
    ISetShopList,
    IShopAction,
} from './types/actions';
import {IProductFilter} from '../../types/filter';

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
    map: {},
    topTenlist: [],
    isLoading: false,
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

const onAddShop = (state: IShopState, action: IAddShop): IShopState => {
    const {shop} = action;
    const {id} = shop;

    return {
        ...state,
        map: {
            ...state.map,
            [id]: shop,
        },
    }
};

const onSetShopList = (state: IShopState, action: ISetShopList): IShopState => {
    const {list} = action;

    return {
        ...state,
        topTenlist: list,
    }
};

const onSetIsLoading = (state: IShopState, action: ISetIsLoading): IShopState => {
    const {isLoading} = action;

    return {
        ...state,
        isLoading
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
        case ShopAction.SHOP_ADD:
            return onAddShop(state, action);
        case ShopAction.SHOP_SET_IS_LOADING:
            return onSetIsLoading(state, action);
        case ShopAction.SHOP_SET_LIST:
            return onSetShopList(state, action);
        default:
            return state;
    }
}
