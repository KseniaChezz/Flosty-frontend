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

import {IShop} from '../../../types/shop';

import {COLORS} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

import {navigate} from '../../../utils';

interface IProps {
    shop: IShop;
}

const ShopSection = memo((props: IProps) => {
    const {shop} = props;
    const {
        id,
        logo,
        name,
        rating,
    } = shop;

    const onShopPress = () => {
        navigate(RootNavigatorRoutes.SHOP_PROFILE, {id});
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onShopPress}
        >
            <Image
                source={{uri: logo}}
                style={styles.shopImg}
            />

            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {name}
                </Text>

                {!!rating && <Rating rating={rating} />}
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
        height: 25,
        width: 25,
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
