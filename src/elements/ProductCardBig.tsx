import React, {memo, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet} from 'react-native';

import Price from './Price';
import Rating from './Rating';

import {TEXT, COLORS} from '../constants';

import {IFeedProduct} from '../types/product';

interface IProps {
    product: IFeedProduct;
    onProductPress: () => void;
    onBasketPress: () => void;
    onFavoritePress: () => void;
    isShopShown?: boolean;
}

const ProductCardBig = memo((props: IProps) => {
    const {
        product,
        onProductPress,
        onBasketPress,
        onFavoritePress,
        isShopShown,
    }= props;
    const {
        img,
        price,
        rating,
        shopName,
        shopLogo,
        ref: {
            name,
            type,
        }
    } = product;
    const [ratio, setRatio] = useState<number>(0);
    const subscription: string = type === 'tag' ? `#${name}` : TEXT.shop;

    const source =  Image.getSize(
        img,
        (width: number, height: number) => {
            setRatio(width / height);
    },
        (err) => console.log(err));

    return (
        <TouchableOpacity onPress={onProductPress} style={styles.container}>

            {!!isShopShown &&
                <View style={styles.shopContainer}>
                    <Image
                        style={styles.logo}
                        source={{uri: shopLogo}}
                    />

                    <View>
                        <Text style={[styles.text, styles.shop]}>{shopName}</Text>
                        <Text style={[styles.text, styles.subscription]}>{TEXT.subscription} {subscription}</Text>
                    </View>
                </View>
            }

            <Image
                style={[styles.productImage, {aspectRatio: ratio}]}
                source={{uri:img}}
            />

            <View style={styles.textContainer}>

                <View style={styles.priceAndRatingContainer}>

                    <Price price={price}/>

                    {rating && <Rating rating={rating} />}

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
    shopContainer: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: COLORS.White,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    logo: {
        height: 36,
        width: 36,
        borderRadius: 18,
        marginRight: 15,
    },
    productImage: {
        width: '100%',
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
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
    shop: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '600',
    },
    subscription: {
        fontSize: 12,
        lineHeight: 14,
    },
});

export default ProductCardBig;
