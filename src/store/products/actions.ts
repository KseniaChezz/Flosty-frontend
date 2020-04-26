import {ProductsAction} from './productsActionEnum';

import {
    ISetIsLoading,
    IAddShopProducts,
    IAddTagProducts,
    IAddDetailProduct,
} from './types/actions';
import {IDetailProduct} from '../../types/product';

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

export const addTagProducts = (tagId: string, productList: any): IAddTagProducts => {
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
