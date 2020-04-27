import React from 'react';
import {memo} from 'react';
import {
    Text,
    TextStyle,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

import {formatProductPrice} from '../utils';

interface IProps {
    price: number
    style?: TextStyle | TextStyle[];
}

const Price = memo((props: IProps) => {
    const {price, style} = props;

    return (
        <Text style={[styles.priceText, style]}>
            {formatProductPrice(price)}
        </Text>
    );
});

const styles = StyleSheet.create({
    priceText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        lineHeight: 20,
        color: COLORS.DarkGrey,
        marginRight: 5,
        fontWeight: '500',
    },
});

export default Price;
