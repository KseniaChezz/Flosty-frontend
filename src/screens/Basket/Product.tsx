import React, {memo, SetStateAction, Dispatch} from 'react';
import {useDispatch} from 'react-redux';

import {BasketProductCard} from '../../elements';

import {updateProductQuantity} from '../../store/basket/thunks/updateProductQuantity';
import {deleteProduct} from '../../store/basket/thunks/deleteProduct';

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
    quantity: number;
    shopId: number;
    selectedProductIdListMap: Record<number, number[]>;
    setSelectedProductIdListMap: Dispatch<SetStateAction<Record<number, number[]>>>;
}

const Product = memo((props: IProps) => {
    const {product, quantity, shopId, selectedProductIdListMap, setSelectedProductIdListMap} = props;
    const {id: productId} = product;
    const isSelected = isProductSelected(shopId, productId, selectedProductIdListMap);
    const dispatch = useDispatch();

    const onUnselectProductPress = () => {
        unSelectBasketProduct(shopId, productId, setSelectedProductIdListMap);
    };

    const onSelectProductPress = () => {
        selectBasketProduct(shopId, productId, setSelectedProductIdListMap);
    };

    const onIncreaseProductQuantityPress = () => {
        dispatch(updateProductQuantity(shopId, productId, quantity + 1));
    };

    const onDecreaseProductQuantityPress = () => {
        if (quantity === 1) return;

        dispatch(updateProductQuantity(shopId, productId, quantity - 1));
    };

    const onDeleteProductPress = () => {
        dispatch(deleteProduct(shopId, productId));
    };

    return (
        <BasketProductCard
            product={product}
            quantity={quantity}
            isSelected={isSelected}
            onProductPress={isSelected ? onUnselectProductPress : onSelectProductPress}
            onIncreaseProductQuantityPress={onIncreaseProductQuantityPress}
            onDecreaseProductQuantityPress={onDecreaseProductQuantityPress}
            onDeleteProductPress={onDeleteProductPress}
        />
    );
});

export default Product;
