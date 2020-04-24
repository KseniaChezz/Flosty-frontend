import {IShopProduct} from '../../../types/product';

export interface IProductsState {
    isLoading: boolean;
    shopMap: IShopMap;
    productMap: IProductMap;
}

interface IShopMap {
    [shopId: number]: IShopProduct[];
}

interface IProductMap {
    [productId: number]: any;
}
