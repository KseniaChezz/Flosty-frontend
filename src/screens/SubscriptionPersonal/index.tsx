import React, {memo, useState, useEffect, Fragment} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';

import {styles} from './style';

import {ScreenWrapperWithBackButton, ProductList} from '../../elements';
import AdjustedSubscriptionCard from '../Subscriptions/AdjustedSubscriptionCard';

import {getProductsByTagListAndShop} from '../../store/products/thunks/getProductsByTagListAndShop';
import {deleteSubscriptionFromList} from '../../store/subscriptionList/thunks/deleteSubscription';
import {resetProductFilters} from '../../store/products/actions';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {IState} from '../../store';
import {ITag} from '../../types/shop';
import {ISubscription} from '../../types/subscription';
import {IShopTaglistInfo} from '../../store/products/types/state';
import {IShopProduct} from '../../types/product';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes, ShowShopProductListMode, SubscriptionType} from '../../enums';

import {getTagListAndShopId} from '../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.SUBSCRIPTION_PERSONAL>;
type ScreenRouteProp = RouteProp<IRootNavigatorParamList, RootNavigatorRoutes.SUBSCRIPTION_PERSONAL>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const SubscriptionPersonal = memo((props:IProps) => {
    const {
        navigation,
        route: {
            params: {
                subscription,
            },
        },
    } = props;
    const {
        id,
        shops,
        tags,
    } = subscription;
    const tagIdList: number[] = tags.map((tag: ITag) => +tag.id);
    const shopId: number[] | undefined = shops && shops[0] && [shops[0].id];
    const tagListId: string = getTagListAndShopId(tagIdList, shopId);
    const isProductListLoading: boolean = useSelector((store: IState) => store.products.isLoading);
    const shopTaglistInfo: IShopTaglistInfo = useSelector(
        (store: IState) => store.products.shopTagListMap[tagListId]);
    const productList: IShopProduct[] | undefined = shopTaglistInfo?.productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsByTagListAndShop(tagIdList, shopId));
    }, []);

    const onBackPress = () => {
        navigation.goBack();
        dispatch(resetProductFilters());
    };

    const onUnSubscribePress = (id: number) => {
        return () => dispatch(deleteSubscriptionFromList(id));
    };

    const onEditAdjustableSubscriptionPress = (subscription: ISubscription) => {
        return () => {
            navigation.navigate(RootNavigatorRoutes.SUBSCRIPTION_DETAIL, {subscription});
        }
    };

    const renderProductList = () => {
        if (!productList) return null;

        return (
            <View style={styles.container}>
                <ProductList productList={productList}/>
            </View>
        )
    }

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.personalSubscription}
            onBackPress={onBackPress}
        >
            <Spinner visible={isProductListLoading} />

            <ScrollView>
                <AdjustedSubscriptionCard
                    subscription={subscription}
                    onEditPress={onEditAdjustableSubscriptionPress(subscription)}
                    onUnSubscribePress={onUnSubscribePress(id)}
                    style={styles.personalSubscription}
                    tagsContainerStyle={styles.tagsContainerStyle}
                />

                {renderProductList()}
            </ScrollView>
        </ScreenWrapperWithBackButton>
    );
});

export default SubscriptionPersonal;
