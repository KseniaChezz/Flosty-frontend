import {IUserProfileItem} from '../types/user';

import {TEXT} from '../constants/text';
import {RootNavigatorRoutes} from '../enums';

export const userInfoList: IUserProfileItem[] = [
    {
        name: RootNavigatorRoutes.USER_PROFILE_ORDER_LIST,
        text: TEXT.myOrders,
        img: require('../../assets/images/my_order.png'),
    },
    {
        name: RootNavigatorRoutes.USER_PROFILE_ADDRESS_LIST,
        text: TEXT.myAddresses,
        img: require('../../assets/images/my_address.png'),
    },
    {
        name: RootNavigatorRoutes.USER_PROFILE_CARD_LIST,
        text: TEXT.myCards,
        img: require('../../assets/images/my_cards.png'),
    },
];

export const messagesAndSettingsList: IUserProfileItem[] = [
    {
        name: RootNavigatorRoutes.USER_PROFILE_MESSAGE_LIST,
        text: TEXT.messages,
        img: require('../../assets/images/messages.png'),
    },
    {
        name: RootNavigatorRoutes.USER_PROFILE_NOTIFICATIONS,
        text: TEXT.notifications,
        img: require('../../assets/images/notification.png'),
    },
    {
        name: RootNavigatorRoutes.USER_PROFILE_SUPPORT,
        text: TEXT.support,
        img: require('../../assets/images/helper.png'),
    },
    {
        name: RootNavigatorRoutes.USER_PROFILE_SETTINGS,
        text: TEXT.settings,
        img: require('../../assets/images/settings.png'),
    },
];
