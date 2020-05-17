import {IProductsState} from './types/state';
import {IAppAction} from '../app/types/actions';
import {
    IAddShopProducts,
    IAddTagProducts,
    IAddShopAndTagListProducts,
    IProductsAction,
    ISetIsLoading,
    IAddDetailProduct,
    ISetPopularProductList,
    ISetProductFilterMinPrice,
    ISetProductFilterMaxPrice,
    ISetProductFilterCheckBox,
    IResetProductFilters,
} from './types/actions';
import {IProductFilter} from '../../types/filter';

import {ProductsAction} from './productsActionEnum';
import {AppAction} from '../app/appActionEnum';
import {TEXT} from '../../constants';

const getInitialFilters = (): IProductFilter => {
    return {
        sorting: TEXT.default,
        category: TEXT.allCategories,
        season: TEXT.allSeasons,
        maxPrice: '',
        minPrice: '',
    };
}

const initialState: IProductsState = {
    isLoading: false,
    shopMap: {},
    tagMap: {},
    shopTagListMap: {},
    productMap: {},
    popularProductList: [],
    filter: getInitialFilters(),
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

const onAddTagProducts = (state: IProductsState, action: IAddTagProducts): IProductsState => {
    const {tagId, productList} = action;
    return {
        ...state,
        tagMap: {
            ...state.tagMap,
            [tagId]: productList,
        },
    }
};

const onAddShopAndTagListProducts = (state: IProductsState, action: IAddShopAndTagListProducts): IProductsState => {
    const {shopAndTagListId, shopAndTagListInfo} = action;

    return {
        ...state,
        shopTagListMap: {
            ...state.shopTagListMap,
            [shopAndTagListId]: shopAndTagListInfo,
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

const onSetPopularProductList = (state: IProductsState, action: ISetPopularProductList): IProductsState => {
    const {productList} = action;

    return {
        ...state,
        popularProductList: productList,
    }
};

const onSetProductFilterMinPrice = (state: IProductsState, action: ISetProductFilterMinPrice): IProductsState => {
    const {price} = action;

    return {
        ...state,
        filter: {
            ...state.filter,
            minPrice: price,
        },
    }
};

const onSetProductFilterMaxPrice = (state: IProductsState, action: ISetProductFilterMaxPrice): IProductsState => {
    const {price} = action;

    return {
        ...state,
        filter: {
            ...state.filter,
            maxPrice: price,
        },
    }
};

const onSetProductFilterCheckBox = (state: IProductsState, action: ISetProductFilterCheckBox): IProductsState => {
    const {filterName, value} = action;

    return {
        ...state,
        filter: {
            ...state.filter,
            [filterName]: value,
        },
    }
};

const onResetProductFilters = (state: IProductsState, action: IResetProductFilters): IProductsState => {
    return {
        ...state,
        filter: getInitialFilters(),
    }
};

export const productsReducer = (
    state: IProductsState = initialState,
    action: IProductsAction | IAppAction,
): IProductsState => {
    switch (action.type) {
        case ProductsAction.PRODUCTS_SET_IS_LOADING:
            return onSetIsLoading(state, action);
        case ProductsAction.PRODUCTS_ADD_SHOP_PRODUCTS:
            return onAddShopProducts(state, action);
        case ProductsAction.PRODUCTS_ADD_TAG_PRODUCTS:
            return onAddTagProducts(state, action);
        case ProductsAction.PRODUCTS_ADD_SHOP_AND_TAG_LIST_PRODUCTS:
            return onAddShopAndTagListProducts(state, action);
        case ProductsAction.PRODUCTS_ADD_DETAIL_PRODUCT:
            return onAddDetailProduct(state, action);
        case ProductsAction.PRODUCTS_SET_POPULAR_PRODUCT_LIST:
            return onSetPopularProductList(state, action);
        case ProductsAction.PRODUCTS_FILTER_SET_MIN_PRICE:
            return onSetProductFilterMinPrice(state, action);
        case ProductsAction.PRODUCTS_FILTER_SET_MAX_PRICE:
            return onSetProductFilterMaxPrice(state, action);
        case ProductsAction.PRODUCTS_FILTER_SET_CHECKBOX:
            return onSetProductFilterCheckBox(state, action);
        case ProductsAction.PRODUCTS_FILTER_RESET:
            return onResetProductFilters(state, action);
        case AppAction.APP_SET_DEFAULT:
            return initialState;
        default:
            return state;
    }
};
