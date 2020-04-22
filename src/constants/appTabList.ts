import {AppTab, RootNavigatorRoutes} from '../enums';
import {IAppTab} from '../types/app';

export const appTabList: IAppTab[] = [
    {
        name: AppTab.MAIN,
        selectedImg: require('../../assets/images/home_select.png'),
        defaultImg: require('../../assets/images/home_default.png'),
        screen: RootNavigatorRoutes.SUBSCRIPTIONS,
    },
    {
        name: AppTab.SEARCH,
        selectedImg: require('../../assets/images/search_select.png'),
        defaultImg: require('../../assets/images/search_default.png'),
        screen: RootNavigatorRoutes.SEARCH,
    },
    {
        name: AppTab.FAVORITE,
        selectedImg: require('../../assets/images/chosen_select.png'),
        defaultImg: require('../../assets/images/chosen_default.png'),
        screen: RootNavigatorRoutes.FAVORITE,
    },
    {
        name: AppTab.BASKET,
        selectedImg: require('../../assets/images/basket_select.png'),
        defaultImg: require('../../assets/images/basket_default.png'),
        screen: RootNavigatorRoutes.SEARCH,
    },
];
