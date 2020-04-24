import {ProductsAction} from '../productsActionEnum';

import {IShopProduct, IDetailProduct} from '../../../types/product';

export interface ISetIsLoading {
    type: ProductsAction.PRODUCTS_SET_IS_LOADING;
    isLoading: boolean;
}

export interface IAddShopProducts {
    type: ProductsAction.PRODUCTS_ADD_SHOP_PRODUCTS;
    shopId: number;
    productList: IShopProduct[];
}

export interface IAddDetailProduct {
    type: ProductsAction.PRODUCTS_ADD_DETAIL_PRODUCT;
    product: IDetailProduct;
}

export type IProductsAction = ISetIsLoading
    | IAddShopProducts
    | IAddDetailProduct;
