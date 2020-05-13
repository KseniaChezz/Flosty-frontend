import {ProductsAction} from '../productsActionEnum';

import {IShopProduct, IDetailProduct} from '../../../types/product';
import {ITagInfoAndITagProductList, IShopTaglistInfo} from './state';
import {IProductFilterKey} from '../../../types/filter';

export interface ISetIsLoading {
    type: ProductsAction.PRODUCTS_SET_IS_LOADING;
    isLoading: boolean;
}

export interface IAddShopProducts {
    type: ProductsAction.PRODUCTS_ADD_SHOP_PRODUCTS;
    shopId: number;
    productList: IShopProduct[];
}

export interface IAddTagProducts {
    type: ProductsAction.PRODUCTS_ADD_TAG_PRODUCTS;
    tagId: number;
    productList: ITagInfoAndITagProductList;
}

export interface IAddShopAndTagListProducts {
    type: ProductsAction.PRODUCTS_ADD_SHOP_AND_TAG_LIST_PRODUCTS;
    shopAndTagListId: string;
    shopAndTagListInfo: IShopTaglistInfo;
}

export interface IAddDetailProduct {
    type: ProductsAction.PRODUCTS_ADD_DETAIL_PRODUCT;
    product: IDetailProduct;
}

export interface ISetPopularProductList {
    type: ProductsAction.PRODUCTS_SET_POPULAR_PRODUCT_LIST;
    productList: IShopProduct[];
}

export interface ISetProductFilterMinPrice {
    type: ProductsAction.PRODUCTS_FILTER_SET_MIN_PRICE;
    price: string;
}

export interface ISetProductFilterMaxPrice {
    type: ProductsAction.PRODUCTS_FILTER_SET_MAX_PRICE;
    price: string;
}

export interface ISetProductFilterCheckBox {
    type: ProductsAction.PRODUCTS_FILTER_SET_CHECKBOX;
    filterName: IProductFilterKey;
    value: string;
}

export interface IResetProductFilters {
    type: ProductsAction.PRODUCTS_FILTER_RESET,
}

export type IProductsAction = ISetIsLoading
    | IAddShopProducts
    | IAddTagProducts
    | IAddShopAndTagListProducts
    | IAddDetailProduct
    | ISetPopularProductList
    | ISetProductFilterMinPrice
    | ISetProductFilterMaxPrice
    | ISetProductFilterCheckBox
    | IResetProductFilters;
