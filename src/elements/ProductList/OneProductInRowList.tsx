import React, {memo, Fragment} from 'react';

import ProductCardBig from '../ProductCardBig';

import {IShopProduct} from '../../types/product';

interface IProps {
    productList: IShopProduct[];
}

const OneProductInRowList = memo((props: IProps) => {
    const {productList} = props;

    return (
        <Fragment>
            {productList.map((product: IShopProduct, index: number) => {
                return (
                    <ProductCardBig
                        key={index}
                        product={product}
                        onProductPress={() => {}}
                        onBasketPress={() => {}}
                        onFavoritePress={() => {}}
                    />
                )
            })}
        </Fragment>
    )
});

export default OneProductInRowList;
