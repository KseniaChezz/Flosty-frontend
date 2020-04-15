import React, {memo, useState, Fragment} from 'react';
import {View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet} from 'react-native';

import Price from './Price';
import Rating from './Rating';

import {COLORS} from '../constants';

import {IProduct} from '../types/product';

interface IProps {
    product: IProduct;
    onProductPress: () => void;
    onBasketPress: () => void;
    onFavoritePress: () => void;
}

const ProductCardBig = memo((props: IProps) => {
    const {
        product,
        onProductPress,
        onBasketPress,
        onFavoritePress,
    }= props;
    const {
        img,
        price,
        rating,
    } = product;
    const source =  Image.resolveAssetSource(img)
    const {width, height} = Image.resolveAssetSource(source);
    const ratio: number = width / height;

    return (
        <TouchableOpacity onPress={onProductPress} style={styles.container}>

            <Image
                style={[styles.productImage, {aspectRatio: ratio}]}
                source={img}
            />

            <View style={styles.textContainer}>

                <View style={styles.priceAndRatingContainer}>

                    <Price price={price}/>

                    <Rating rating={rating} />

                </View>

                <View style={styles.iconContainer}>

                    <TouchableOpacity onPress={onFavoritePress}>
                        <Image
                            source={require('../../assets/images/chosen_default.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onBasketPress}>
                        <Image
                            source={require('../../assets/images/basket_default.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                </View>

            </View>

        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
       marginTop: 10,
    },
    productImage: {
        width: '100%',
        height: undefined,
        resizeMode: 'contain',
    },
    textContainer: {
        flexDirection: 'row',
        height: 44,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.White,
        paddingHorizontal: 10,
    },
    priceAndRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        width: 90,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
    },
});

export default ProductCardBig;
