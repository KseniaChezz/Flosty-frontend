import React, {memo, SetStateAction, Dispatch} from 'react';

import {BasketProductCard} from '../../elements';

import {IBasketProduct} from '../../types/basket';

import {
    isShopSelected,
    isProductSelected,
    unSelectAllShopBasketProducts,
    unSelectBasketProduct,
    selectAllShopBasketProducts,
    selectBasketProduct,
} from '../../utils';

interface IProps {
    product: IBasketProduct
    shopId: number;
    selectedProductIdListMap: Record<number, number[]>;
    setSelectedProductIdListMap: Dispatch<SetStateAction<Record<number, number[]>>>;
}

const Product = memo((props: IProps) => {
    const {product, shopId, selectedProductIdListMap, setSelectedProductIdListMap} = props;
    const {id: productId} = product;
    const isSelected = isProductSelected(shopId, productId, selectedProductIdListMap);

    const onUnselectProductPress = () => {
        unSelectBasketProduct(shopId, productId, setSelectedProductIdListMap);
    };

    const onSelectProductPress = () => {
        selectBasketProduct(shopId, productId, setSelectedProductIdListMap);
    };

    return (
        <BasketProductCard
            product={product}
            isSelected={isSelected}
            onProductPress={isSelected ? onUnselectProductPress : onSelectProductPress}
        />
    );
});

export default Product;
