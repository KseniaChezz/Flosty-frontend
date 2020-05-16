import React from 'react';
import {memo} from 'react';
import {
    Text,
    View,
    TextStyle,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

import {formatProductPrice} from '../utils';

interface IProps {
    title: string;
    value: number;
    style?: TextStyle;
}

const InfoRow = memo((props: IProps) => {
    const {
        title,
        value,
        style,
    } = props;

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={[styles.text, style]}>
                    {title}
                </Text>
                <Text style={[styles.text, style]}>
                    {formatProductPrice(value)}
                </Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
        paddingHorizontal: 8,
    },
    innerContainer: {
        height: 44,
        borderBottomColor: COLORS.Border,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: COLORS.DarkGrey,
        fontFamily: 'Montserrat',
        fontSize: 14,
        lineHeight: 18,
        paddingLeft: 4,
    },
});

export default InfoRow;
