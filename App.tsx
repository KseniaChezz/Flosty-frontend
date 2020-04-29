/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
    Login,
    Registration,
    RegistrationForm,
} from './src/screens/LoginAndRegistration';
import {
    UserProfile,
    UserAddressList,
    UserAddress,
    UserCardList,
    UserCard,
    UserSettings,
    UserNotifications,
    SupportChat,
    UserCommunicationShopList,
    ShopChat,
} from './src/screens/User';
import Subscriptions from './src/screens/Subscriptions';
import SubscriptionDetail from './src/screens/SubscriptionDetail';
import SubscriptionPersonal from './src/screens/SubscriptionPersonal';
import SubscriptionLinked from './src/screens/SubscriptionLinked';
import ShopProfile from './src/screens/ShopProfile';
import TagProfile from './src/screens/TagProfile';
import Product from './src/screens/Product';
import Search from './src/screens/Search';
import Favorite from './src/screens/Favorite';

import {store} from './src/store';

import {IRootNavigatorParamList} from './src/types/rootNavigator';

import {RootNavigatorRoutes} from './src/enums';

import {navigationRef} from './src/utils/navigation';

const Stack = createStackNavigator<IRootNavigatorParamList>();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator headerMode="none" initialRouteName={RootNavigatorRoutes.LOGIN}>
                    <Stack.Screen name={RootNavigatorRoutes.PRODUCT_PROFILE} component={Product} />
                    <Stack.Screen name={RootNavigatorRoutes.SHOP_PROFILE} component={ShopProfile} />
                    <Stack.Screen name={RootNavigatorRoutes.TAG_PROFILE} component={TagProfile} />
                    <Stack.Screen name={RootNavigatorRoutes.SEARCH} component={Search} />
                    <Stack.Screen name={RootNavigatorRoutes.FAVORITE} component={Favorite} />
                    <Stack.Screen name={RootNavigatorRoutes.SUBSCRIPTIONS} component={Subscriptions} />
                    <Stack.Screen name={RootNavigatorRoutes.SUBSCRIPTION_DETAIL} component={SubscriptionDetail} />
                    <Stack.Screen name={RootNavigatorRoutes.SUBSCRIPTION_PERSONAL} component={SubscriptionPersonal} />
                    <Stack.Screen name={RootNavigatorRoutes.SUBSCRIPTION_LINKED} component={SubscriptionLinked} />
                    <Stack.Screen name={RootNavigatorRoutes.USER_PROFILE} component={UserProfile} />
                    <Stack.Screen name={RootNavigatorRoutes.USER_PROFILE_ADDRESS_LIST} component={UserAddressList} />
                    <Stack.Screen name={RootNavigatorRoutes.USER_PROFILE_ADDRESS} component={UserAddress} />
                    <Stack.Screen name={RootNavigatorRoutes.USER_PROFILE_CARD_LIST} component={UserCardList} />
                    <Stack.Screen name={RootNavigatorRoutes.USER_PROFILE_CARD} component={UserCard} />
                    <Stack.Screen name={RootNavigatorRoutes.USER_PROFILE_SETTINGS} component={UserSettings} />
                    <Stack.Screen name={RootNavigatorRoutes.USER_PROFILE_NOTIFICATIONS} component={UserNotifications} />
                    <Stack.Screen name={RootNavigatorRoutes.USER_PROFILE_SUPPORT} component={SupportChat} />
                    <Stack.Screen name={RootNavigatorRoutes.USER_PROFILE_MESSAGE_LIST} component={UserCommunicationShopList} />
                    <Stack.Screen name={RootNavigatorRoutes.USER_PROFILE_SHOP_CHAT} component={ShopChat} />
                    <Stack.Screen name={RootNavigatorRoutes.LOGIN} component={Login} />
                    <Stack.Screen name={RootNavigatorRoutes.REGISTRATION} component={Registration} />
                    <Stack.Screen name={RootNavigatorRoutes.REGISTRATION_FORM} component={RegistrationForm} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
