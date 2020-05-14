import {basketAction} from './basketActionEnum';

import {
    IBasketAction,
    IDeleteProduct,
    ISetDataIsProcessing,
    ISetList,
    ISetListIsLoading,
    IUpdateProductQuantity,
} from './types/actions';
import {IBasketState, IShopInfoAndBasketProduct} from './types/state';
import {IBasketProduct} from '../../types/basket';

const initialState: IBasketState = {
    list: [],
    isListLoading: false,
    isDataProcessing: false,
}

const onSetDataIsProcessing = (state: IBasketState, action: ISetDataIsProcessing): IBasketState => {
    const {isDataProcessing} = action;

    return {
        ...state,
        isDataProcessing,
    }
}

const onSetListIsLoading = (state: IBasketState, action: ISetListIsLoading): IBasketState => {
    const {isLoading} = action;

    return {
        ...state,
        isListLoading: isLoading,
    }
}

const onSetList = (state: IBasketState, action: ISetList): IBasketState => {
    const {list} = action;

    return {
        ...state,
        list,
    }
}

const onDeleteProduct = (state: IBasketState, action: IDeleteProduct): IBasketState => {
    const {shopId, productId} = action;
    const {list} = state;
    const filteredList: IShopInfoAndBasketProduct[] = list.filter((item: IShopInfoAndBasketProduct) => {
        if (item.id !== shopId) {
            return true;
        } else if (item.productList.length === 1 && item.productList[0].id === productId) {
            return false;
        } else {
            item.productList = item.productList.filter((item: IBasketProduct) => item.id !== productId);
            return true;
        }
    })

    return {
        ...state,
        list: filteredList,
    }
}

const onUpdateProductQuantity = (state: IBasketState, action: IUpdateProductQuantity): IBasketState => {
    const {shopId, productId, productQuantity} = action;
    const {list} = state;
    const updatedList: IShopInfoAndBasketProduct[] = list.slice();
    const shop: IShopInfoAndBasketProduct | undefined = updatedList.find((item: IShopInfoAndBasketProduct) => {
        return item.id === shopId;
    });
    let productList: IBasketProduct[] | undefined = shop?.productList;

    if (productList) {
        productList = productList.map((item: IBasketProduct) => {
            if (item.id === productId) {
                item.quantity = productQuantity;
                return item;
            } else {
                return item;
            }
        });
    }

    return {
        ...state,
        list: updatedList,
    }
}

export const basketReducer = (state: IBasketState = initialState, action: IBasketAction): IBasketState => {
    switch (action.type) {
        case basketAction.BASKET_SET_DATA_IS_PROCESSING:
            return onSetDataIsProcessing(state, action);
        case basketAction.BASKET_SET_LIST_IS_LOADING:
            return onSetListIsLoading(state, action);
        case basketAction.BASKET_SET_LIST:
            return onSetList(state, action);
        case basketAction.BASKET_DELETE_PRODUCT:
            return onDeleteProduct(state, action);
        case basketAction.BASKET_UPDATE_PRODUCT_QUANTITY:
            return onUpdateProductQuantity(state, action);
        default:
            return state;
    }
}
