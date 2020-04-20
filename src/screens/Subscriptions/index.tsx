import React, {RefObject} from 'react';
import {memo, useState, useRef, useEffect} from 'react';
import {View, Text, ListRenderItemInfo, ActivityIndicator} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';
import {useDispatch} from 'react-redux';

import {styles} from './style';

import {CommonScreenWrapper} from '../../elements';
import ShopSubscribeCard from './ShopSubscribeCard';
import SearchSubscribeCard from './SearchSubscribeCard';

import {getShopList} from '../../store/shop/thunks/getShopList';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {IShop} from '../../types/shop';

import {TEXT, COLORS} from '../../constants';

import {RootNavigatorRoutes} from '../../enums';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.SUBSCRIPTIONS>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const Subscriptions = memo((props: IProps) => {
    const {navigation} = props;
    const [shopList, setShopList] = useState<IShop[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const carousel = useRef<CarouselStatic<IShop>>(null);
    const dispatch = useDispatch();

    const onGetShopListSuccessCallback = (shopList: IShop[]) => {
        const list: IShop[] = [...shopList, {} as IShop];
        setShopList(list);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        dispatch(getShopList(onGetShopListSuccessCallback));
    }, []);

    const renderItem = (item: {item: IShop; index: number;}) => {
        const {
            item: shop,
            index,
        } = item;

        if (index !== shopList.length - 1) {
            return (
                <ShopSubscribeCard
                    shop={shop}
                    onPress={onSubscribePress}
                />
            );
        }

        return (
            <SearchSubscribeCard/>
        );
    };

    const onSubscribePress = () => {
        carousel?.current && carousel.current.snapToNext();
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

            {isLoading &&
                <View style={styles.textContainer}>
                    <ActivityIndicator
                        size="large"
                        color={COLORS.LightGrey}
                    />
                </View>
            }

            {!isLoading &&
                <View style={styles.cardContainer}>
                    <Carousel<IShop>
                        data={shopList}
                        renderItem={renderItem}
                        sliderWidth={800}
                        itemWidth={200}
                        layout={'default'}
                        firstItem={0}
                        ref={carousel}
                    />
                </View>
            }
        </CommonScreenWrapper>
    );
});

export default Subscriptions;
