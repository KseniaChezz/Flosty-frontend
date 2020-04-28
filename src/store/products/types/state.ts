import {IShopProduct} from '../../../types/product';
import { ITag } from '../../../types/shop';
import {IProductFilter} from '../../../types/filter';

export interface IProductsState {
    isLoading: boolean;
    shopMap: IShopMap;
    tagMap: ITagMap;
    productMap: IProductMap;
    filter: IProductFilter;
}

interface IShopMap {
    [shopId: number]: IShopProduct[];
}

interface ITagMap {
    [tagId: number]: ITagInfoAndITagProductList;
}

export interface ITagInfoAndITagProductList {
    name: string;
    subscribers: number;
    logo: string;
    popularTagList: ITag[];
    productList: IShopProduct[];
}

interface IProductMap {
    [productId: number]: any;
}
