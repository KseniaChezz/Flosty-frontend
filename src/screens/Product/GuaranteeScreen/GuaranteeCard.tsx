import React from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../../../constants';

interface IProps {
    text: string;
    img: ImageSourcePropType;
}

const GuaranteeCard = memo((props: IProps) => {
    const {text, img} = props;

    return (
        <View style={styles.card}>
            <Text style={[styles.text, styles.cardText]}>
                {text}
            </Text>

            <Image
                source={img}
                style={styles.imgCard}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.White,
        marginHorizontal: 10,
        borderRadius: 10,
        paddingTop: 35,
        paddingBottom: 10,
        paddingHorizontal: 14,
        position: 'relative',
        marginBottom: 44,
    },
    text: {
        fontFamily: 'Montserrat',
    },
    cardText: {
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
    },
    imgCard: {
        position: 'absolute',
        top: -24,
        left: 16,
        height: 48,
        width: 48,
        borderRadius: 22,
        shadowColor: COLORS.GreyBlue,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
    },
});

export default GuaranteeCard;
