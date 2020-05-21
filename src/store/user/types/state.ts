import {
    IUser,
    IAddress,
    ICard,
    INotification,
    IMessage,
    IShopMessageMap,
} from '../../../types/user';

export interface IUserState {
    isProcessingData: boolean;
    isLoading: boolean;
    main: IUser,
    addressList: IAddress[];
    cardList: ICard[];
    notificationList: INotification[];
    supportChat: IMessage[];
    messageList: IShopMessageMap;
    orderList: any[];
}
