import {IUserAddressFieldList, IUserCardFieldList, IMessage} from './user';

export type IRootNavigatorParamList = {
    Login: undefined;
    Registration: {screen: number};
    RegistrationForm: {screen: number};

    UserProfile: undefined;
    UserProfileAddressList: undefined;
    UserProfileAddress: {title: string, fieldList: IUserAddressFieldList, id?: string}
    UserProfileCardList: undefined;
    UserProfileCard: {title: string, fieldList: IUserCardFieldList, id?: string}
    UserProfileOrderList: undefined;
    UserProfileSettings: undefined;
    UserProfileNotifications: undefined;
    UserProfileSupport: undefined;
    UserProfileMessageList: undefined;
    UserProfileShopChat: {shopName: string};

    Subscriptions: undefined;

    ShopProfile: {id: number};

    ProductProfile: undefined;

    Search: undefined;

    Favorite: undefined;
};



