import {basketAction} from './basketActionEnum';

import {
    ISetDataIsProcessing,
    ISetList,
    ISetListIsLoading,
    IAddProduct,
    IDeleteProduct,
    IDeleteAllProducts,
    IDeleteAllShopProducts,
    IDeleteShopProducts,
    IUpdateProductQuantity,
    ISelectAddress,
    ISelectCard,
    ISetDeliveryTypeList,
    ISelectDeliveryType,
    ISetDeliveryPrice,
} from './types/actions';
import {IShopInfoAndBasketProduct} from './types/state';
import {IAddress, ICard} from '../../types/user';
import {IDeliveryType} from '../../types/basket';

export const setIsBasketListLoading = (isLoading: boolean): ISetListIsLoading => {
    return {
        type: basketAction.BASKET_SET_LIST_IS_LOADING,
        isLoading,
    }
}

export const setIsBasketDataProcessing = (isDataProcessing: boolean): ISetDataIsProcessing => {
    return {
        type: basketAction.BASKET_SET_DATA_IS_PROCESSING,
        isDataProcessing,
    }
}

export const setBasketList = (list: IShopInfoAndBasketProduct[]): ISetList => {
    return {
        type: basketAction.BASKET_SET_LIST,
        list,
    }
}

export const updateProductQuantityInBasketList = (
    shopId: number,
    productId: number,
    productQuantity: number,
): IUpdateProductQuantity => {
    return {
        type: basketAction.BASKET_UPDATE_PRODUCT_QUANTITY,
        shopId,
        productId,
        productQuantity,
    }
}

export const deleteProductFromBasketList = (shopId: number, productId: number): IDeleteProduct => {
    return {
        type: basketAction.BASKET_DELETE_PRODUCT,
        shopId,
        productId,
    }
}

export const deleteAllProductFromBasketList = (): IDeleteAllProducts => {
    return {
        type: basketAction.BASKET_DELETE_ALL_PRODUCTS,
    }
}

export const deleteAllShopProductsFromBasketList = (shopId: number): IDeleteAllShopProducts => {
    return {
        type: basketAction.BASKET_DELETE_ALL_SHOP_PRODUCTS,
        shopId,
    }
}

export const deleteShopProductsFromBasketList = (shopId: number, productIdList: number[]): IDeleteShopProducts => {
    return {
        type: basketAction.BASKET_DELETE_SHOP_PRODUCTS,
        shopId,
        productIdList,
    }
}

export const selectAddress = (address?: IAddress): ISelectAddress => {
    return {
        type: basketAction.BASKET_SELECT_ADDRESS,
        address,
    }
}

export const selectCard = (card?: ICard): ISelectCard => {
    return {
        type: basketAction.BASKET_SELECT_CARD,
        card,
    }
}

export const setDeliveryTypeList = (deliveryTypeList: IDeliveryType[]): ISetDeliveryTypeList => {
    return {
        type: basketAction.BASKET_SET_DELIVERY_TYPE_LIST,
        deliveryTypeList,
    }
}

export const selectDeliveryType = (deliveryType?: IDeliveryType): ISelectDeliveryType => {
    return {
        type: basketAction.BASKET_SELECT_DELIVERY_TYPE,
        deliveryType,
    }
}

export const setDeliveryPrice = (deliveryPrice: number): ISetDeliveryPrice => {
    return {
        type: basketAction.BASKET_SET_DELIVERY_PRICE,
        deliveryPrice,
    }
}
