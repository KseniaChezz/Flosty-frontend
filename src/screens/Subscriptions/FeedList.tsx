import React, {RefObject, Fragment} from 'react';
import {memo, useState} from 'react';
import {
    ListRenderItemInfo,
    FlatList,
    RefreshControl,
} from 'react-native';

import {ProductCardBig} from '../../elements';

import {IFeedProduct} from '../../types/product';

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

    const keyExtractor = (item: IFeedProduct) => {
        return `${item.id}`;
    };

    const renderProduct = (info: ListRenderItemInfo<IFeedProduct>) => {
        const {
            item: product,
        } = info;

        return (
            <ProductCardBig
                product={product}
                isShopShown={true}
                onProductPress={() => {}}
                onBasketPress={() => {}}
                onFavoritePress={() => {}}
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
