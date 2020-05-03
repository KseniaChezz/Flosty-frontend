import {IBasketProduct} from '../../../types/basket';

export interface IBasketState {
    list: IShopInfoAndBasketProduct[];
    isListLoading: boolean;
    isDataProcessing: boolean;
}

export interface IShopInfoAndBasketProduct {
    id: number;
    shopName: string;
    shopLogo: string;
    productList: IBasketProduct[];
}
