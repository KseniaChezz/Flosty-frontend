import {basketAction} from './basketActionEnum';
import {AppAction} from '../app/appActionEnum';

import {
    IBasketAction,
    IDeleteAllProducts,
    IDeleteAllShopProducts,
    IDeleteProduct,
    IDeleteShopProducts,
    ISelectAddress,
    ISelectCard,
    ISelectDeliveryType,
    ISetDataIsProcessing,
    ISetDeliveryTypeList,
    ISetList,
    ISetListIsLoading,
    IUpdateProductQuantity,
} from './types/actions';
import {IBasketState, IShopInfoAndBasketProduct} from './types/state';
import {IBasketProduct} from '../../types/basket';
import {IAppAction} from '../app/types/actions';

const initialState: IBasketState = {
    list: [],
    isListLoading: false,
    isDataProcessing: false,
    selectedAddress: undefined,
    selectedCard: undefined,
    deliveryTypeList: [],
    selectedDeliveryType: undefined,
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

const onDeleteAllProducts = (state: IBasketState, action: IDeleteAllProducts): IBasketState => {
    return {
        ...state,
        list: [],
    }
}

const onDeleteAllShopProducts = (state: IBasketState, action: IDeleteAllShopProducts): IBasketState => {
    const {shopId} = action;
    const {list} = state;
    const filteredList: IShopInfoAndBasketProduct[] = list.filter((item: IShopInfoAndBasketProduct) => {
        return item.id !== shopId;
    });

    return {
        ...state,
        list: filteredList,
    }
}

const onDeleteShopProducts = (state: IBasketState, action: IDeleteShopProducts): IBasketState => {
    const {shopId, productIdList} = action;
    const {list} = state;
    const updatedList: IShopInfoAndBasketProduct[] = list.slice();
    const shop: IShopInfoAndBasketProduct | undefined = updatedList.find((item: IShopInfoAndBasketProduct) => {
        return item.id === shopId;
    });
    let productList: IBasketProduct[] | undefined = shop?.productList;

    if (productList) {
        productList = productList.filter((item: IBasketProduct) => {
            return !productIdList.some((productId: number) => productId === item.id);
        });
    }

    return {
        ...state,
        list: updatedList,
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

const onSelectAddress = (state: IBasketState, action: ISelectAddress): IBasketState => {
    const {address} = action;

    return {
        ...state,
        selectedAddress: address,
    }
}

const onSelectCard = (state: IBasketState, action: ISelectCard): IBasketState => {
    const {card} = action;

    return {
        ...state,
        selectedCard: card,
    }
}

const onSetDeliveryTypeList = (state: IBasketState, action: ISetDeliveryTypeList): IBasketState => {
    const {deliveryTypeList} = action;

    return {
        ...state,
        deliveryTypeList,
    }
}

const onSelectDeliveryType = (state: IBasketState, action: ISelectDeliveryType): IBasketState => {
    const {deliveryType} = action;

    return {
        ...state,
        selectedDeliveryType: deliveryType,
    }
}

export const basketReducer = (state: IBasketState = initialState, action: IBasketAction | IAppAction): IBasketState => {
    switch (action.type) {
        case basketAction.BASKET_SET_DATA_IS_PROCESSING:
            return onSetDataIsProcessing(state, action);
        case basketAction.BASKET_SET_LIST_IS_LOADING:
            return onSetListIsLoading(state, action);
        case basketAction.BASKET_SET_LIST:
            return onSetList(state, action);
        case basketAction.BASKET_DELETE_PRODUCT:
            return onDeleteProduct(state, action);
        case basketAction.BASKET_DELETE_ALL_PRODUCTS:
            return onDeleteAllProducts(state, action);
        case basketAction.BASKET_DELETE_ALL_SHOP_PRODUCTS:
            return onDeleteAllShopProducts(state, action);
        case basketAction.BASKET_DELETE_SHOP_PRODUCTS:
            return onDeleteShopProducts(state, action);
        case basketAction.BASKET_UPDATE_PRODUCT_QUANTITY:
            return onUpdateProductQuantity(state, action);
        case basketAction.BASKET_SELECT_ADDRESS:
            return onSelectAddress(state, action);
        case basketAction.BASKET_SELECT_CARD:
            return onSelectCard(state, action);
        case basketAction.BASKET_SET_DELIVERY_TYPE_LIST:
            return onSetDeliveryTypeList(state, action);
        case basketAction.BASKET_SELECT_DELIVERY_TYPE:
            return onSelectDeliveryType(state, action);
        case AppAction.APP_SET_DEFAULT:
            return initialState;
        default:
            return state;
    }
}
