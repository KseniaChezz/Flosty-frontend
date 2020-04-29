import React, {memo, useState, useEffect, Fragment} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {styles} from './style';

import {ScreenWrapperWithBackButton, ProductList} from '../../elements';
import AdjustedSubscriptionCard from '../Subscriptions/AdjustedSubscriptionCard';

import {getProductsByTagList} from '../../store/products/thunks/getProductsByTagList';
import {deleteSubscriptionFromList} from '../../store/subscriptionList/thunks/deleteSubscription';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {IState} from '../../store';
import {ITag} from '../../types/shop';
import {ISubscription} from '../../types/subscription';
import {IShopProduct} from '../../types/product';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes, ShowShopProductListMode, SubscriptionType} from '../../enums';
import {resetProductFilters} from '../../store/products/actions';

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
    const tagListId: string = tags.map((tag: ITag) => tag.id).join('_');
    const isProductListLoading: boolean = useSelector((stor: IState) => stor.products.isLoading);
    const productList: IShopProduct[] = useSelector((stor: IState) => stor.products.tagListMap[tagListId]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsByTagList(tags.map((tag: ITag) => +tag.id), shops[0]?.id));
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
            const {
                id: subscriptionId,
                shops,
                tags,
            } = subscription;

            navigation.navigate(
                RootNavigatorRoutes.SUBSCRIPTION_DETAIL,
                {
                    subscriptionId,
                    selectedTags: shops[0] ? [{name: shops[0].name, id: `${shops[0].id}`}, ...tags] : [...tags],
                },
            );
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
