import {IProductFilter} from '../../../types/filter';
import {IShop} from '../../../types/shop';

export interface IShopState {
    filter: IProductFilter;
    map: {
        [shopId: string]: IShop;
    };
    list: IShop[];
    isLoading: boolean;
}
