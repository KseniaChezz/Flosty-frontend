import React, {memo, useState, Fragment} from 'react';
import {View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet} from 'react-native';

import Price from './Price';
import Rating from './Rating';

import {COLORS} from '../constants';

import {IShopProduct} from '../types/product';

interface IProps {
    product: IShopProduct;
    onProductPress: () => void;
}

const ProductCardSmall = memo((props: IProps) => {
    const {
        product,
        onProductPress,
    }= props;
    const {
        img,
        price,
        rating,
    } = product;
    const [ratio, setRatio] = useState<number>(0);

    const source =  Image.getSize(
        img,
        (width: number, height: number) => {
            setRatio(width / height);
        },
        (err) => console.log(err));

    return (
        <TouchableOpacity style={{marginTop: 10}}>
            <Image
                source={{uri: img}}
                style={[styles.productImage, {aspectRatio: ratio}]}
            />
            <View style={styles.textContainer}>
                <Price price={price} />

                {rating && <Rating rating={rating} />}
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    productImage: {
        width: '100%',
        height: undefined,
        resizeMode: 'contain',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textContainer: {
        flexDirection: 'row',
        height: 34,
        backgroundColor: COLORS.White,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
});

export default ProductCardSmall;
