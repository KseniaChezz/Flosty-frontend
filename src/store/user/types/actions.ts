import {UserAction} from '../userActionEnum'

import {IUser, IAddress, ICard, INotification, IMessage, IOrder} from '../../../types/user';

export interface ISetUser {
    type: UserAction.USER_SET_USER;
    user: IUser;
}

export interface ISetAddressList {
    type: UserAction.USER_SET_ADDRESS_LIST;
    addressList: IAddress[];
}

export interface IAddAddress {
    type: UserAction.USER_ADD_ADDRESS;
    address: IAddress;
}

export interface IDeleteAddress {
    type: UserAction.USER_DELETE_ADDRESS;
    addressId: number;
}

export interface ISetCardList {
    type: UserAction.USER_SET_CARD_LIST;
    cardList: ICard[];
}

export interface ISetOrderList {
    type: UserAction.USER_SET_ORDER_LIST;
    orderList: IOrder[];
}

export interface IAddCard {
    type: UserAction.USER_ADD_CARD;
    card: ICard;
}

export interface IDeleteCard {
    type: UserAction.USER_DELETE_CARD;
    cardId: number;
}

export interface ISetProcessingData {
    type: UserAction.USER_SET_PROCESSING_DATA;
    isProcessingData: boolean;
}

export interface ISetIsLoading {
    type: UserAction.USER_SET_IS_LOADING;
    isLoading: boolean;
}

export interface ISetNotificationList {
    type: UserAction.USER_SET_NOTIFICATION_LIST;
    notificationList: INotification[];
}

export interface IAddMessageInSupportChat {
    type: UserAction.USER_SUPPORT_CHAT_ADD_MESSAGE;
    message: IMessage;
}

export interface IAddMessageInShopChat {
    type: UserAction.USER_SHOP_CHAT_ADD_MESSAGE;
    shopId: number;
    message: IMessage;
};

export interface IAddFirstMessageInShopChat {
    type: UserAction.USER_SHOP_CHAT_ADD_FIRST_MESSAGE;
    shopId: number;
    message: IMessage;
    shopName: string;
    shopLogo: string;
};

export type IUserAction = ISetUser
    | ISetAddressList
    | IAddAddress
    | IDeleteAddress
    | ISetCardList
    | ISetOrderList
    | IAddCard
    | IDeleteCard
    | ISetProcessingData
    | ISetIsLoading
    | ISetNotificationList
    | IAddMessageInSupportChat
    | IAddMessageInShopChat
    | IAddFirstMessageInShopChat
