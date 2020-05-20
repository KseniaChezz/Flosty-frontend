import {IBasketProduct} from '../../../types/basket';
import {IAddress, ICard} from '../../../types/user';

export interface IBasketState {
    list: IShopInfoAndBasketProduct[];
    isListLoading: boolean;
    isDataProcessing: boolean;
    selectedAddress: IAddress | undefined;
    selectedCard: ICard | undefined;
}

export interface IShopInfoAndBasketProduct {
    id: number;
    shopName: string;
    shopLogo: string;
    productList: IBasketProduct[];
}
