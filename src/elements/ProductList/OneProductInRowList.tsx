import React, {memo, Fragment} from 'react';

import ProductCardBig from '../ProductCardBig';

import {IShopProduct} from '../../types/product';

import {navigate} from '../../utils';

import {RootNavigatorRoutes, ProductNavigatorRoutes} from '../../enums';

interface IProps {
    productList: IShopProduct[];
}

const OneProductInRowList = memo((props: IProps) => {
    const {productList} = props;

    const onProductPress = (shopId: number, productId: number) => {
        return () => {
            navigate(
                RootNavigatorRoutes.PRODUCT_PROFILE,
                {shopId, productId},
                ProductNavigatorRoutes.PRODUCT_PROFILE_SCREEN,
            );
        }
    };

    return (
        <Fragment>
            {productList.map((product: IShopProduct, index: number) => {
                const {id, shopId} = product;

                return (
                    <ProductCardBig
                        key={index}
                        product={product}
                        onProductPress={onProductPress(shopId, id)}
                    />
                )
            })}
        </Fragment>
    )
});

export default OneProductInRowList;
