import React, {RefObject, Fragment} from 'react';
import {memo, useState} from 'react';
import {
    ListRenderItemInfo,
    FlatList,
    RefreshControl,
} from 'react-native';

import {ProductCardBig} from '../../elements';

import {IFeedProduct} from '../../types/product';

import {ProductNavigatorRoutes, RootNavigatorRoutes} from '../../enums';

import {navigate} from '../../utils';

interface IProps {
    list: IFeedProduct[];
    onRefresh: () => void;
    isRefreshing: boolean;
}

const SubscriptionFeed = memo((props: IProps) => {
    const {
        list,
        onRefresh,
        isRefreshing,
    } = props;

    const onProductPress = (shopId: number, productId: number) => {
        return () => {
            debugger;
            navigate(
                RootNavigatorRoutes.PRODUCT_PROFILE,
                {shopId, productId},
                ProductNavigatorRoutes.PRODUCT_PROFILE_SCREEN,
            );
        }
    };

    const keyExtractor = (item: IFeedProduct) => {
        return `${item.id}`;
    };

    const renderProduct = (info: ListRenderItemInfo<IFeedProduct>) => {
        const {
            item: product,
        } = info;
        const {id, shopId} = product;

        return (
            <ProductCardBig
                product={product}
                isShopShown={true}
                onProductPress={onProductPress(shopId, id)}
                onBasketPress={() => {}}
            />
        );
    }

    return (
        <FlatList<IFeedProduct>
            data={list}
            keyExtractor={keyExtractor}
            renderItem={renderProduct}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }
        />
    );
});

export default SubscriptionFeed;
