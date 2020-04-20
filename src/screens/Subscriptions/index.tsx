import React from 'react';
import {memo, useState, useRef} from 'react';
import {View, Text, ListRenderItemInfo} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Carousel from 'react-native-snap-carousel';

import {styles} from './style';

import {CommonScreenWrapper} from '../../elements';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import { IShopSubscription } from '../../types/subscription';

import {TEXT} from '../../constants';

import {RootNavigatorRoutes} from '../../enums';
import ShopSubscribeCard from './ShopSubscribeCard';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.SUBSCRIPTIONS>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const subscriptionList: IShopSubscription[] = [
    {
        id: 'id1',
        name: 'AZART',
        logo: '',
        goodsImg: ['1', '2', '3'],
        subscribers: 123,
    },
    {
        id: 'id2',
        name: 'INCITY',
        logo: '',
        goodsImg: ['1', '2', '3'],
        subscribers: 1000,
    },
    {
        id: 'id3',
        name: 'JLO',
        logo: '',
        goodsImg: ['1', '2', '3'],
        subscribers: 1000000,
    },
    {
        id: 'id4',
        name: 'MONKI',
        logo: '',
        goodsImg: ['1', '2', '3'],
        subscribers: 1431,
    }
];

const Subscriptions = memo((props: IProps) => {
    const {navigation} = props;

    const renderItem = (item: {item: IShopSubscription; index: number;}) => {
        const {item: subscription} = item;

        return (
            <ShopSubscribeCard
                subscription={subscription}
            />
        );
    };

    return (
        <CommonScreenWrapper>
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.title]}>
                    {TEXT.welcome}
                </Text>
                <Text style={[styles.text, styles.message]}>
                    {TEXT.doSubscribe}
                </Text>
            </View>

            <View style={styles.cardContainer}>
                <Carousel<IShopSubscription>
                    data={subscriptionList}
                    renderItem={renderItem}
                    sliderWidth={800}
                    itemWidth={200}
                    layout={'default'}
                    firstItem={0}
                />
            </View>
        </CommonScreenWrapper>
    );
});

export default Subscriptions;
