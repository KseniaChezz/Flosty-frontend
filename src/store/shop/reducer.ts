import {ShopAction} from './shopActionEnum';
import {AppAction} from '../app/appActionEnum';

import {
    IAddShop,
    ISetIsLoading,
    ISetShopList,
    IShopAction,
} from './types/actions';
import {IAppAction} from '../app/types/actions';
import {IShopState} from './types/state';

const initialState: IShopState = {
    map: {},
    topTenlist: [],
    isLoading: false,
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

export const shopReducer = (state: IShopState = initialState, action: IShopAction | IAppAction): IShopState => {
    switch (action.type) {
        case ShopAction.SHOP_ADD:
            return onAddShop(state, action);
        case ShopAction.SHOP_SET_IS_LOADING:
            return onSetIsLoading(state, action);
        case ShopAction.SHOP_SET_LIST:
            return onSetShopList(state, action);
        case AppAction.APP_SET_DEFAULT:
            return initialState;
        default:
            return state;
    }
}
