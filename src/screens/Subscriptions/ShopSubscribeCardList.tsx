import React, {RefObject, Fragment, useState} from 'react';
import {memo, useRef} from 'react';
import {
    View,
    Text,
    ListRenderItemInfo,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';

import ShopSubscribeCard from './ShopSubscribeCard';
import SearchSubscribeCard from './SearchSubscribeCard';

import {postSubscription} from '../../store/subscriptionList/thunks/addSubscription';
import {IShop} from '../../types/shop';
import {IState} from '../../store';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes, SubscriptionViewMode} from '../../enums';

import {navigate} from '../../utils';

interface IProps {
    setSubscriptionViewMode: (mode: SubscriptionViewMode) => void;
}

const ShopSubscribeCardList = memo((props: IProps) => {
    const {setSubscriptionViewMode} = props;
    const shopList: IShop[] = useSelector((store: IState) => store.shop.list);
    const isSubscriptionDataProcessing: boolean = useSelector(
        (store: IState) => store.subscriptionList.dataIsProcessing);
    const carousel = useRef<CarouselStatic<IShop>>(null);
    const dispatch = useDispatch();

    const renderItem = (item: {item: IShop; index: number;}) => {
        const {
            item: shop,
            index,
        } = item;

        const onPress = (id: number) => {
            return () => navigate(RootNavigatorRoutes.SHOP_PROFILE, {id});
        };

        if (index !== shopList.length) {
            return (
                <ShopSubscribeCard
                    shop={shop}
                    onCardPress={onPress(shop.id)}
                    onSubscribePress={onSubscribePress(shop.id, index)}
                />
            );
        }

        return (
            <SearchSubscribeCard/>
        );
    };

    const onAddSubscriptionSuccessCallback = (index: number) => {
        return () => {
            carousel?.current && carousel.current.snapToNext();

            if (index === shopList.length - 1) {
                setSubscriptionViewMode(SubscriptionViewMode.FEED);
            }
        }
    }

    const onSubscribePress = (id: number, index: number) => {
        return () => {
            dispatch(postSubscription([], [id], onAddSubscriptionSuccessCallback(index)));
        }
    };

    return (
        <Fragment>
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.title]}>
                    {TEXT.welcome}
                </Text>

                <Text style={[styles.text, styles.message]}>
                    {TEXT.doSubscribe}
                </Text>
            </View>

            <View style={styles.cardContainer}>
                <Carousel<IShop>
                    data={[...shopList, {} as IShop]}
                    renderItem={renderItem}
                    sliderWidth={800}
                    itemWidth={200}
                    layout={'default'}
                    firstItem={0}
                    ref={carousel}
                />

                {isSubscriptionDataProcessing &&
                    <ActivityIndicator
                        size="large"
                        color={COLORS.DarkGrey}
                        style={styles.indicator}
                    />
                }

                {isSubscriptionDataProcessing && <View style={styles.loadingShild}/>}
            </View>
        </Fragment>
    );
});

export const styles = StyleSheet.create({
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 1,
        height: '40%',
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
    title: {
        fontSize: 21,
        lineHeight: 25,
        fontWeight: '600',
        marginBottom: 15,
    },
    message: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        textAlign: 'center',
        width: 315,
    },
    cardContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    loadingShild: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    indicator: {
        marginTop: 30,
        flex: 1,
    },
});

export default ShopSubscribeCardList;
