/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import {
    Login,
    Registration,
    RegistrationForm,
} from '../screens/LoginAndRegistration';
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
} from '../screens/User';
import Subscriptions from '../screens/Subscriptions';
import SubscriptionDetail from '../screens/SubscriptionDetail';
import SubscriptionPersonal from '../screens/SubscriptionPersonal';
import SubscriptionLinked from '../screens/SubscriptionLinked';
import ShopProfile from '../screens/ShopProfile';
import TagProfile from '../screens/TagProfile';
import Product from '../screens/Product';
import Search from '../screens/Search';
import Favorite from '../screens/Favorite';
import Basket from '../screens/Basket';
import {ModalWindow} from '../elements';

import {resetError} from '../store/app/actions';
import {addMessageInSupportChat} from '../store/user/actions';

import {IRootNavigatorParamList} from '../types/rootNavigator';
import {IState} from '../store';

import {RootNavigatorRoutes, MessageAuthor} from '../enums';
import {TEXT} from '../constants';

import {navigationRef, navigate} from '../utils/navigation';

console.disableYellowBox = true;
const Stack = createStackNavigator<IRootNavigatorParamList>();

const RootNavigator = () => {
    const isError: boolean = useSelector((store: IState) => store.app.isError);
    const errorText: string = useSelector((store: IState) => store.app.errorText);
    const dispatch = useDispatch();

    const onCancelPress = () => {
        dispatch(resetError());
    };

    const onSubmitPress = () => {
        dispatch(addMessageInSupportChat(
            {
                date: Date.now(),
                text: `${TEXT.errorTextPreface}${errorText}`,
                author: MessageAuthor.USER,
            }
        ));
        navigate(RootNavigatorRoutes.USER_PROFILE_SUPPORT);
        dispatch(resetError());
    };

    return (
        <Fragment>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator headerMode="none" initialRouteName={RootNavigatorRoutes.LOGIN}>
                    <Stack.Screen name={RootNavigatorRoutes.BASKET} component={Basket} />
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

             <ModalWindow
                isWindowVisible={isError}
                title={TEXT.errorTitle}
                text={TEXT.errorText}
                submitButtonText={TEXT.sendMessageToSupport}
                onCancelPress={onCancelPress}
                onSubmitPress={onSubmitPress}
            />
        </Fragment>
    );
};

export default RootNavigator;
