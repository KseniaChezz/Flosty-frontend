import {FavoriteAction} from './favoriteActionEnum';

import {
    IAddProductToFavoriteList,
    IDeleteProductFromFavoriteList,
    IFavoriteAction,
    ISetFavoriteList,
    ISetIsFavoriteDataProcessing,
    ISetIsFavoriteListLoading,
} from './types/actions';
import {IFavoriteState} from './types/state';
import {IShopProduct} from '../../types/product';

const initialState: IFavoriteState = {
    list: [],
    isLoading: false,
    isDataProcessing: false,
}

const onSetIsFavoriteDataProcessing = (state: IFavoriteState, action: ISetIsFavoriteDataProcessing): IFavoriteState => {
    const {isDataProcessing} = action;

    return {
        ...state,
        isDataProcessing,
    };
};

const onSetIsFavoriteListLoading = (state: IFavoriteState, action: ISetIsFavoriteListLoading): IFavoriteState => {
    const {isLoading} = action;

    return {
        ...state,
        isLoading,
    };
};

const onSetFavoriteList = (state: IFavoriteState, action: ISetFavoriteList): IFavoriteState => {
    const {list} = action;

    return {
        ...state,
        list,
    };
};

const onAddProductToFavoriteList = (state: IFavoriteState, action: IAddProductToFavoriteList): IFavoriteState => {
    const {product} = action;

    return {
        ...state,
        list: [...state.list, product],
    };
};

const onDeleteProductFromFavoriteList = (
    state: IFavoriteState,
    action: IDeleteProductFromFavoriteList,
): IFavoriteState => {
    const {productId} = action;

    return {
        ...state,
        list: state.list.filter((item: IShopProduct) => item.id !== productId),
    };
};

export const favoriteReducer = (state: IFavoriteState = initialState, action: IFavoriteAction): IFavoriteState => {
    switch (action.type) {
        case FavoriteAction.FAVORITE_SET_IS_DATA_PROCESSING:
            return onSetIsFavoriteDataProcessing(state, action);
        case FavoriteAction.FAVORITE_SET_IS_LOADING:
            return onSetIsFavoriteListLoading(state, action);
        case FavoriteAction.FAVORITE_SET_LIST:
            return onSetFavoriteList(state, action);
        case FavoriteAction.FAVORITE_ADD_PRODUCT:
            return onAddProductToFavoriteList(state, action);
        case FavoriteAction.FAVORITE_DELETE_PRODUCT:
            return onDeleteProductFromFavoriteList(state, action);
        default:
            return state;
    }
};
