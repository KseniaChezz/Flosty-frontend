import {ProductsAction} from './productsActionEnum';

import {
    ISetIsLoading,
    IAddShopProducts,
    IAddTagProducts,
    IAddDetailProduct,
    IAddTagListProducts,
    ISetProductFilterMinPrice,
    ISetProductFilterMaxPrice,
    ISetProductFilterCheckBox,
    IResetProductFilters,
} from './types/actions';
import {IDetailProduct, IShopProduct} from '../../types/product';
import {ITagInfoAndITagProductList} from './types/state';
import {IProductFilterKey} from '../../types/filter';

export const setIsLoading = (isLoading: boolean): ISetIsLoading => {
    return {
        type: ProductsAction.PRODUCTS_SET_IS_LOADING,
        isLoading,
    };
};

export const addShopProducts = (shopId: number, productList: IShopProduct[]): IAddShopProducts => {
    return {
        type: ProductsAction.PRODUCTS_ADD_SHOP_PRODUCTS,
        shopId,
        productList,
    };
};

export const addTagProducts = (tagId: number, productList: ITagInfoAndITagProductList): IAddTagProducts => {
    return {
        type: ProductsAction.PRODUCTS_ADD_TAG_PRODUCTS,
        tagId,
        productList,
    };
};

export const addTagListProducts = (tagListId: string, productList: IShopProduct[]): IAddTagListProducts => {
    return {
        type: ProductsAction.PRODUCTS_ADD_TAG_LIST_PRODUCTS,
        tagListId,
        productList,
    };
};

export const addDetailProduct = (product: IDetailProduct): IAddDetailProduct => {
    return {
        type: ProductsAction.PRODUCTS_ADD_DETAIL_PRODUCT,
        product,
    };
};

export const setProductFilterMinPrice = (price: string): ISetProductFilterMinPrice => {
    return {
        type: ProductsAction.PRODUCTS_FILTER_SET_MIN_PRICE,
        price,
    };
};

export const setProductFilterMaxPrice = (price: string): ISetProductFilterMaxPrice => {
    return {
        type: ProductsAction.PRODUCTS_FILTER_SET_MAX_PRICE,
        price,
    };
};

export const setProductFilterCheckBox = (
    filterName: IProductFilterKey,
    value: string,
): ISetProductFilterCheckBox => {
    return {
        type: ProductsAction.PRODUCTS_FILTER_SET_CHECKBOX,
        filterName,
        value,
    };
};

export const resetProductFilters = (): IResetProductFilters => {
    return {
        type: ProductsAction.PRODUCTS_FILTER_RESET,
    };
};
