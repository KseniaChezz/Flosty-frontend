import {IProductsState} from './types/state';
import {
    IAddShopProducts,
    IProductsAction,
    ISetIsLoading,
    IAddDetailProduct,
} from './types/actions';

import {ProductsAction} from './productsActionEnum';

const initialState: IProductsState = {
    isLoading: false,
    shopMap: {},
    productMap: {},
};

const onSetIsLoading = (state: IProductsState, action: ISetIsLoading): IProductsState => {
    const {isLoading} = action;
    return {
        ...state,
        isLoading,
    }
};

const onAddShopProducts = (state: IProductsState, action: IAddShopProducts): IProductsState => {
    const {shopId, productList} = action;
    return {
        ...state,
        shopMap: {
            ...state.shopMap,
            [shopId]: productList,
        },
    }
};

const onAddDetailProduct = (state: IProductsState, action: IAddDetailProduct): IProductsState => {
    const {product} = action;
    const {id} = product;
    return {
        ...state,
        productMap: {
            ...state.productMap,
            [id]: product,
        },
    }
};

export const productsReducer = (state: IProductsState = initialState, action: IProductsAction): IProductsState => {
    switch (action.type) {
        case ProductsAction.PRODUCTS_SET_IS_LOADING:
            return onSetIsLoading(state, action);
        case ProductsAction.PRODUCTS_ADD_SHOP_PRODUCTS:
            return onAddShopProducts(state, action);
        case ProductsAction.PRODUCTS_ADD_DETAIL_PRODUCT:
            return onAddDetailProduct(state, action);
        default:
            return state;
    }
};
