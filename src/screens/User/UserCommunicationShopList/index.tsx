import React, {memo, useState} from 'react';
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    ListRenderItemInfo,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {styles} from './style';

import {ScreenWrapperWithBackButton} from '../../../elements';
import CommunicationShopCard from './CommunicationShopCard';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IState} from '../../../store';
import {IMessage, IShopMessageMap, IShopInfoAndMessage} from '../../../types/user';

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
    const communicationShopList: IShopInfoAndMessage[] = getUserCommunicationShopList(shopMessageMap);

    const onBackPress = () => {
        navigation.goBack();
    };

    const onShopCardPress = (id: number, name: string) => {
        return () => {
            navigation.navigate(RootNavigatorRoutes.USER_PROFILE_SHOP_CHAT, {shopId: id, shopName: name});
        }
    };

    const keyExtractor = (item: IShopInfoAndMessage) => {
        return item.name;
    };

    const renderCommunicationShop = (info: ListRenderItemInfo<IShopInfoAndMessage>) => {
        const {item} = info;
        const {id, name} = item;

        return (
            <CommunicationShopCard
                shopItem={item}
                onPress={onShopCardPress(id, name)}
            />
        );
    };

    const renderCommunicationShopList = () => {
        return (
            <View style={styles.container}>
                <FlatList<IShopInfoAndMessage>
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
