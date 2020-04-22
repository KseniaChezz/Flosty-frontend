import React, {RefObject, Fragment, useState} from 'react';
import {memo, useRef} from 'react';
import {
    View,
    Text,
    ListRenderItemInfo,
    ActivityIndicator,
} from 'react-native';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './style';

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
    const [shopIdList, setShopIdList] = useState<number[]>([]);
    const shopList: IShop[] = useSelector((store: IState) => store.shop.list);
    const carousel = useRef<CarouselStatic<IShop>>(null);
    const dispatch = useDispatch();

    const renderItem = (item: {item: IShop; index: number;}) => {
        const {
            item: shop,
            index,
        } = item;

        const onPress = () => {
            navigate(RootNavigatorRoutes.SHOP_PROFILE);
        };

        if (index !== shopList.length) {
            return (
                <ShopSubscribeCard
                    shop={shop}
                    onCardPress={onPress}
                    onSubscribePress={onSubscribePress(shop.id, index)}
                />
            );
        }

        return (
            <SearchSubscribeCard/>
        );
    };

    const onSubscribePress = (id: number, index: number) => {
        return () => {
            setShopIdList([...shopIdList, id]);
            carousel?.current && carousel.current.snapToNext();

            if (index === shopList.length - 1) {
                setSubscriptionViewMode(SubscriptionViewMode.FEED);
                // dispatch(postSubscription([], [id]));
            }
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
            </View>
        </Fragment>
    );
});

export default ShopSubscribeCardList;
