import React, {Fragment, memo, useRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';

import ShopSubscribeCard from './ShopSubscribeCard';
import SearchSubscribeCard from './SearchSubscribeCard';

import {postSubscription} from '../../store/subscriptionList/thunks/addSubscription';
import {getFeedList} from '../../store/feed/thunks/getFeedList';

import {IShop} from '../../types/shop';
import {IState} from '../../store';

import {COLORS, TEXT} from '../../constants';
import {RootNavigatorRoutes, SubscriptionType, SubscriptionViewMode} from '../../enums';

import {navigate} from '../../utils';

interface IProps {
    setSubscriptionViewMode: (mode: SubscriptionViewMode) => void;
}

const ShopSubscribeCardList = memo((props: IProps) => {
    const {setSubscriptionViewMode} = props;
    const shopList: IShop[] = useSelector((store: IState) => store.shop.topTenlist);
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

    const onSubscribeSuccessCallback = (index: number) => {
        return () => {
            carousel?.current && carousel.current.snapToNext();

            if (index === shopList.length - 1) {
                setSubscriptionViewMode(SubscriptionViewMode.FEED);
                dispatch(getFeedList());
            }
        }
    }

    const onSubscribePress = (id: number, index: number) => {
        return () => {
            dispatch(postSubscription([], [id], onSubscribeSuccessCallback(index)));
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
                    scrollEnabled={!isSubscriptionDataProcessing}
                    ref={carousel}
                />

                <Spinner
                    visible={isSubscriptionDataProcessing}
                />
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
});

export default ShopSubscribeCardList;
