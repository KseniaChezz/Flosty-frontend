import {FavoriteAction} from './favoriteActionEnum';

import {
    ISetIsFavoriteListLoading,
    ISetIsFavoriteDataProcessing,
    ISetFavoriteList,
    IAddProductToFavoriteList,
    IDeleteProductFromFavoriteList,
} from './types/actions';
import {IShopProduct} from '../../types/product';

export const setFaforiteListIsLoading = (isLoading: boolean): ISetIsFavoriteListLoading => {
    return {
        type: FavoriteAction.FAVORITE_SET_IS_LOADING,
        isLoading,
    }
};

export const setFaforiteListDataIsProcessing = (isDataProcessing: boolean): ISetIsFavoriteDataProcessing => {
    return {
        type: FavoriteAction.FAVORITE_SET_IS_DATA_PROCESSING,
        isDataProcessing,
    }
};

export const setFaforiteList = (list: IShopProduct[]): ISetFavoriteList => {
    return {
        type: FavoriteAction.FAVORITE_SET_LIST,
        list,
    }
};

export const addProductToFaforiteList = (product: IShopProduct): IAddProductToFavoriteList => {
    return {
        type: FavoriteAction.FAVORITE_ADD_PRODUCT,
        product,
    }
};

export const deleteProductFromFaforiteList = (productId: number): IDeleteProductFromFavoriteList => {
    return {
        type: FavoriteAction.FAVORITE_DELETE_PRODUCT,
        productId,
    }
};
