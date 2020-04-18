import React from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {Rating} from '../../../elements'

import {IShopShort} from '../../../types/product';

import {COLORS} from '../../../constants';

interface IProps {
    shop: IShopShort;
}

const ShopSection = memo((props: IProps) => {
    const {shop} = props;
    const {
        img,
        name,
        rating,
    } = shop;

    return (
        <TouchableOpacity style={styles.container}>
            <Image
                source={img}
                style={styles.shopImg}
            />

            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {name}
                </Text>

                <Rating
                    rating={rating}
                />
            </View>

            <Image
                source={require('../../../../assets/images/next.png')}
                style={styles.nextImg}
            />
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
        height: 60,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 8,
    },
    shopImg: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    nextImg: {
        height: 30,
        width: 30,
    },
    textContainer: {
        flex: 1,
        marginLeft: 8,
    },
    title: {
        color: COLORS.DarkGrey,
        fontFamily: 'Montserrat',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        marginLeft: 7,
    },
});

export default ShopSection;
