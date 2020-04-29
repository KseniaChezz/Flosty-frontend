import {IProductsState} from './types/state';
import {
    IAddShopProducts,
    IAddTagProducts,
    IAddTagListProducts,
    IProductsAction,
    ISetIsLoading,
    IAddDetailProduct,
    ISetProductFilterMinPrice,
    ISetProductFilterMaxPrice,
    ISetProductFilterCheckBox,
    IResetProductFilters,
} from './types/actions';
import {IProductFilter} from '../../types/filter';

import {ProductsAction} from './productsActionEnum';
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
    tagListMap: {},
    productMap: {},
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

const onAddTagListProducts = (state: IProductsState, action: IAddTagListProducts): IProductsState => {
    const {tagListId, productList} = action;
    return {
        ...state,
        tagListMap: {
            ...state.tagListMap,
            [tagListId]: productList,
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

export const productsReducer = (state: IProductsState = initialState, action: IProductsAction): IProductsState => {
    switch (action.type) {
        case ProductsAction.PRODUCTS_SET_IS_LOADING:
            return onSetIsLoading(state, action);
        case ProductsAction.PRODUCTS_ADD_SHOP_PRODUCTS:
            return onAddShopProducts(state, action);
        case ProductsAction.PRODUCTS_ADD_TAG_PRODUCTS:
            return onAddTagProducts(state, action);
        case ProductsAction.PRODUCTS_ADD_TAG_LIST_PRODUCTS:
            return onAddTagListProducts(state, action);
        case ProductsAction.PRODUCTS_ADD_DETAIL_PRODUCT:
            return onAddDetailProduct(state, action);
        case ProductsAction.PRODUCTS_FILTER_SET_MIN_PRICE:
            return onSetProductFilterMinPrice(state, action);
        case ProductsAction.PRODUCTS_FILTER_SET_MAX_PRICE:
            return onSetProductFilterMaxPrice(state, action);
        case ProductsAction.PRODUCTS_FILTER_SET_CHECKBOX:
            return onSetProductFilterCheckBox(state, action);
        case ProductsAction.PRODUCTS_FILTER_RESET:
            return onResetProductFilters(state, action);
        default:
            return state;
    }
};
