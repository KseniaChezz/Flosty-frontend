import {IShopProduct} from '../../../types/product';

export interface IProductsState {
    isLoading: boolean;
    shopMap: IShopMap;
    tagMap: ITagMap;
    productMap: IProductMap;
}

interface IShopMap {
    [shopId: number]: IShopProduct[];
}

interface ITagMap {
    [tagId: number]: IShopProduct[];
}

interface IProductMap {
    [productId: number]: any;
}
