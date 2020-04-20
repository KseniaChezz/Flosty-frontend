import {IProductFilter} from '../../../types/filter';
import {IShop} from '../../../types/shop';

export interface IShopState {
    filter: IProductFilter;
    shopList: {
        [shopId: string]: IShop;
    };
}
