import {
    IUserAction,
    ISetUser,
    ISetAddressList,
    IAddAddress,
    IDeleteAddress,
    ISetCardList,
    IAddCard,
    IDeleteCard,
    ISetProcessingData,
    ISetNotificationList,
    IAddMessageInSupportChat,
    IAddMessageInShopChat,
    IAddFirstMessageInShopChat,
} from './types/actions';
import {IUser, IAddress, ICard, INotification, IMessage} from '../../types/user';

import {UserAction} from './userActionEnum';

export const setUser = (user: IUser): ISetUser => {
    return {
        type: UserAction.USER_SET_USER,
        user,
    };
}

export const setAddressList = (addressList: IAddress[]): ISetAddressList => {
    return {
        type: UserAction.USER_SET_ADDRESS_LIST,
        addressList,
    };
}

export const addAddress = (address: IAddress): IAddAddress => {
    return {
        type: UserAction.USER_ADD_ADDRESS,
        address,
    };
}

export const deleteAddress = (addressId: string): IDeleteAddress => {
    return {
        type: UserAction.USER_DELETE_ADDRESS,
        addressId,
    };
}

export const setCardList = (cardList: ICard[]): ISetCardList => {
    return {
        type: UserAction.USER_SET_CARD_LIST,
        cardList,
    };
}

export const addCard = (card: ICard): IAddCard => {
    return {
        type: UserAction.USER_ADD_CARD,
        card,
    };
}

export const deleteCard = (cardId: string): IDeleteCard => {
    return {
        type: UserAction.USER_DELETE_CARD,
        cardId,
    };
}

export const setProcessingData = (isProcessingData: boolean): ISetProcessingData => {
    return {
        type: UserAction.USER_SET_PROCESSING_DATA,
        isProcessingData,
    };
}

export const setNotificationList = (notificationList: INotification[]): ISetNotificationList => {
    return {
        type: UserAction.USER_SET_NOTIFICATION_LIST,
        notificationList,
    };
}

export const addMessageInSupportChat = (message: IMessage): IAddMessageInSupportChat => {
    return {
        type: UserAction.USER_SUPPORT_CHAT_ADD_MESSAGE,
        message,
    };
}

export const addMessageInShopChat = (shopId: number, message: IMessage): IAddMessageInShopChat => {
    return {
        type: UserAction.USER_SHOP_CHAT_ADD_MESSAGE,
        shopId,
        message,
    };
}

export const addFirstMessageInShopChat = (
    shopId: number,
    message: IMessage,
    shopName: string,
    shopLogo: string,
): IAddFirstMessageInShopChat => {
    return {
        type: UserAction.USER_SHOP_CHAT_ADD_FIRST_MESSAGE,
        shopId,
        message,
        shopName,
        shopLogo,
    };
}
