import {IShop} from '../../../types/shop';

export interface IShopState {
    map: {
        [shopId: string]: IShop;
    };
    topTenlist: IShop[];
    isLoading: boolean;
}
