import {IUserAddressFieldList, IUserCardFieldList, IMessage} from './user';
import {ISubscription} from './subscription';

import {SubscriptionType} from '../enums';

export type IRootNavigatorParamList = {
    Login: undefined;
    Registration: {screen: number};
    RegistrationForm: {screen: number};

    UserProfile: undefined;
    UserProfileAddressList: undefined;
    UserProfileAddress: {title: string, fieldList: IUserAddressFieldList, id?: string}
    UserProfileCardList: undefined;
    UserProfileCard: {
        title: string,
        fieldList: IUserCardFieldList,
        id?: string,
        isModalMode?: boolean,
        onAddCardSuccess: (id: number) => void,
    }
    UserProfileOrderList: undefined;
    UserProfileSettings: undefined;
    UserProfileNotifications: undefined;
    UserProfileSupport: undefined;
    UserProfileMessageList: undefined;
    UserProfileShopChat: {shopId: number, shopName: string, shopLogo?: string};

    Subscriptions: undefined;
    SubscriptionDetail: {subscription: ISubscription};
    SubscriptionPersonal: {subscription: ISubscription},
    SubscriptionLinked: {subscriptionId: number, type: SubscriptionType}

    ShopProfile: {id: number};

    TagProfile: {id: number};

    ProductProfile: undefined;

    Search: undefined;

    Favorite: undefined;

    Basket: undefined;
};



