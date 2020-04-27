import {IShopProduct} from '../../../types/product';

export interface IFavoriteState {
    list: IShopProduct[];
    isLoading: boolean;
    isDataProcessing: boolean;
}
