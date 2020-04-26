import {IUserAddressFieldList, IUserCardFieldList, IMessage} from './user';
import {ITag} from './shop';
import {ISubscriptionTag} from './subscription';

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
    SubscriptionDetail: {subscriptionId?: number, popularTags?: ITag[], selectedTags: ITag[]};

    ShopProfile: {id: number};

    TagProfile: {tag: ISubscriptionTag};

    ProductProfile: undefined;

    Search: undefined;

    Favorite: undefined;
};



