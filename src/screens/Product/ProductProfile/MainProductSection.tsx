import React from 'react';
import {memo, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import ProductImage from './ProductImage';
import ProductDescription from './ProductDescription';

import {IProductDetail} from '../../../types/product';

interface IProps {
    product: IProductDetail;
}

const MainProductSection = memo((props: IProps) => {
    const {product} = props;
    const {
        title,
        description,
        price,
        oldPrice,
        rating,
        img,
        boughtNumber,
        savedNumber,
    } = product;

    return (
        <View style={styles.container}>
            <ProductImage
                img={img}
            />

            <ProductDescription
                title={title}
                description={description}
                price={price}
                oldPrice={oldPrice}
                rating={rating}
                boughtNumber={boughtNumber}
                savedNumber={savedNumber}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 10,
    },
});

export default MainProductSection;
