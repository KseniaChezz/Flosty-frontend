import React, {memo, Fragment} from 'react';

import ProductCardBig from '../ProductCardBig';

import {IProduct} from '../../types/product';

interface IProps {
    productList: IProduct[];
}

const OneProductInRowList = memo((props: IProps) => {
    const {productList} = props;

    return (
        <Fragment>
            {productList.map((product: IProduct, index: number) => {
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
