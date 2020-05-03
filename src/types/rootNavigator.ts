import {IUserAddressFieldList, IUserCardFieldList, IMessage} from './user';
import {ITag} from './shop';
import {IShopProduct} from './product';
import {ISubscription} from './subscription';

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
    UserProfileShopChat: {shopId: number, shopName: string, shopLogo?: string};

    Subscriptions: undefined;
    SubscriptionDetail: {
        selectedTags: ITag[],
        subscriptionId?: number,
        popularTags?: ITag[],
        productList?: IShopProduct[],
    };
    SubscriptionPersonal: {subscription: ISubscription},
    SubscriptionLinked: {subscriptionId: number}

    ShopProfile: {id: number};

    TagProfile: {id: number};

    ProductProfile: undefined;

    Search: undefined;

    Favorite: undefined;

    Basket: undefined;
};



