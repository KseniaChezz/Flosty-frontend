import React, {memo, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View, ListRenderItemInfo} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {styles} from './style';

import {ScreenWrapperWithBackButton} from '../../../elements';
import CommunicationShopCard from './CommunicationShopCard';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IState} from '../../../store';
import {IMessage, IShopMessageMap, IShopMessage} from '../../../types/user';

import {COLORS, TEXT} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

import {getUserCommunicationShopList, getTimeOrDate} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_MESSAGE_LIST>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const UserCommunicationShopList = memo((props: IProps) => {
    const {navigation} = props;
    const shopMessageMap: IShopMessageMap = useSelector((state: IState) => state.user.messageList);
    // const communicationShopList: IShopMessage[] = getUserCommunicationShopList(shopMessageMap);
    const communicationShopList: IShopMessage[] = [];

    const onBackPress = () => {
        navigation.goBack();
    };

    const onShopCardPress = (name: string) => {
        return () => {
            navigation.navigate(RootNavigatorRoutes.USER_PROFILE_SHOP_CHAT, {shopName: name});
        }
    };

    const keyExtractor = (item: IShopMessage) => {
        return item.name;
    };

    const renderCommunicationShop = (info: ListRenderItemInfo<IShopMessage>) => {
        const {
            item: shopItem,
        } = info;

        return (
            <CommunicationShopCard
                shopItem={shopItem}
                onPress={onShopCardPress(shopItem.name)}
            />
        );
    };

    const renderCommunicationShopList = () => {
        return (
            <View style={styles.container}>
                <FlatList<IShopMessage>
                    data={communicationShopList}
                    keyExtractor={keyExtractor}
                    renderItem={renderCommunicationShop}
                />
            </View>
        );
    }

    const renderEmptyList = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.text}>
                    {TEXT.emptyMessageList}
                </Text>
            </View>
        );
    }

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.messages}
            onBackPress={onBackPress}
        >
            {communicationShopList.length === 0 ? renderEmptyList() : renderCommunicationShopList()}
        </ScreenWrapperWithBackButton>
    );
});

export default UserCommunicationShopList;
