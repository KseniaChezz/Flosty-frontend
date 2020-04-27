import {ProductsAction} from './productsActionEnum';

import {
    ISetIsLoading,
    IAddShopProducts,
    IAddTagProducts,
    IAddDetailProduct,
    ISetProductFilterMinPrice,
    ISetProductFilterMaxPrice,
    ISetProductFilterCheckBox,
    IResetProductFilters,
} from './types/actions';
import {IDetailProduct} from '../../types/product';
import {ITagProductList} from './types/state';
import {IProductFilterKey} from '../../types/filter';

export const setIsLoading = (isLoading: boolean): ISetIsLoading => {
    return {
        type: ProductsAction.PRODUCTS_SET_IS_LOADING,
        isLoading,
    };
};

export const addShopProducts = (shopId: number, productList: any): IAddShopProducts => {
    return {
        type: ProductsAction.PRODUCTS_ADD_SHOP_PRODUCTS,
        shopId,
        productList,
    };
};

export const addTagProducts = (tagId: number, productList: ITagProductList): IAddTagProducts => {
    return {
        type: ProductsAction.PRODUCTS_ADD_TAG_PRODUCTS,
        tagId,
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
