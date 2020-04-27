import {FavoriteAction} from '../favoriteActionEnum';
import { IShopProduct } from '../../../types/product';

export interface ISetIsFavoriteListLoading {
    type: FavoriteAction.FAVORITE_SET_IS_LOADING;
    isLoading: boolean;
}

export interface ISetIsFavoriteDataProcessing {
    type: FavoriteAction.FAVORITE_SET_IS_DATA_PROCESSING;
    isDataProcessing: boolean;
}

export interface ISetFavoriteList {
    type: FavoriteAction.FAVORITE_SET_LIST,
    list: IShopProduct[];
}

export interface IAddProductToFavoriteList {
    type: FavoriteAction.FAVORITE_ADD_PRODUCT,
    product: IShopProduct;
}

export interface IDeleteProductFromFavoriteList {
    type: FavoriteAction.FAVORITE_DELETE_PRODUCT,
    productId: number;
}

export type IFavoriteAction = ISetIsFavoriteListLoading
    | ISetIsFavoriteDataProcessing
    | ISetFavoriteList
    | IAddProductToFavoriteList
    | IDeleteProductFromFavoriteList;
