import React from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {
    Rating,
    Price,
    RoundButton,
} from '../../../elements';

import {TEXT, COLORS} from '../../../constants';

interface IProps {
    title: string;
    text: string;
    rating: string;
    price: number;
    boughtNumber?: number;
    savedNumber?: number;
    oldPrice?: number;
}

const ProductDescription = memo((props: IProps) => {
    const {
        title,
        text,
        price,
        oldPrice,
        rating,
        boughtNumber,
        savedNumber,
    } = props;

    return (
        <View style={styles.descriptionContainer}>
            <View style={styles.priceContainer}>
                <Price
                    price={price}
                    style={[styles.text, styles.currentPrice]}
                />

                {!!oldPrice &&
                    <Price
                        price={oldPrice}
                        style={[styles.text, styles.oldPrice]}
                    />
                }
            </View>

            <Text style={[styles.text, styles.titleText]}>
                {title}
            </Text>

            <Text style={[styles.text, styles.descriptionText]}>
                {text}
            </Text>

            <View style={styles.statisticsContainer}>
                <Rating
                    rating={rating}
                />

                <View style={styles.textRow}>
                    {!!boughtNumber &&
                        <Text style={[styles.text, styles.statisticsText]}>
                            {`${boughtNumber} ${TEXT.bought}`}
                        </Text>
                    }

                    {!!savedNumber &&
                        <Text style={[styles.text, styles.statisticsText, styles.marginLeft15]}>
                            {`${savedNumber} ${TEXT.saved}`}
                        </Text>
                    }
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <RoundButton
                    img={require('../../../../assets/images/messages.png')}
                    onPress={()=>{}}
                />

                <RoundButton
                    img={require('../../../../assets/images/chosen_default.png')}
                    onPress={()=>{}}
                />
            </View>

        </View>
    );
});

const styles = StyleSheet.create({
    descriptionContainer: {
        position: 'relative',
        paddingHorizontal: 12,
        backgroundColor: COLORS.White,
    },
    text: {
        color: COLORS.DarkGrey,
        fontFamily: 'Montserrat',
    },
    titleText: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        marginBottom: 7,
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 18,
    },
    statisticsContainer: {
        flexDirection: 'row',
        height: 44,
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    textRow: {
        flexDirection: 'row',
    },
    statisticsText: {
        color: COLORS.LightGrey,
        fontSize: 12,
        lineHeight: 44,
    },
    marginLeft15: {
        marginLeft: 15,
    },
    priceContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    currentPrice: {
        fontSize: 22,
        lineHeight: 25,
        fontWeight: '600',
    },
    oldPrice: {
        color: COLORS.LightGrey,
        fontSize: 16,
        lineHeight: 25,
        marginLeft: 10,
        textDecorationLine: 'line-through',
    },
    buttonsContainer: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        top: -24,
        right: 12,
    },
});

export default ProductDescription;
