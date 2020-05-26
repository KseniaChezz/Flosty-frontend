import React from 'react';
import {memo, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import ProductImage from './ProductImage';
import ProductDescription from './ProductDescription';

import {IDetailProduct} from '../../../types/product';

interface IProps {
    product: IDetailProduct;
}

const MainProductSection = memo((props: IProps) => {
    const {product} = props;
    const {imageList} = product;

    return (
        <View style={styles.container}>
            <ProductImage imageList={imageList} />

            <ProductDescription product={product} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
});

export default MainProductSection;
