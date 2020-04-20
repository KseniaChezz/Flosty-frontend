import React from 'react';
import {memo, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {ColoredButton} from '../../elements';

import {IShopSubscription} from '../../types/subscription';

import {TEXT, COLORS} from '../../constants';

import {getSubscribersValueText} from '../../utils';

interface IProps {
    subscription: IShopSubscription;
}

const ShopSubscribeCard = memo((props: IProps) => {
    const {subscription} = props;
    const {id, name, subscribers, goodsImg} = subscription;
    const imgList: string[] = ['1', '2', '3'];

    return (
        <View style={styles.card}>

            <View style={styles.shopImg}/>

            <Text style={[styles.text, styles.shopName]}>
                {name}
            </Text>

            <Text style={[styles.text, styles.subscribers]}>
                {getSubscribersValueText(subscribers)}
            </Text>

            <View style={styles.shopGoodsContainer}>
                {goodsImg.map((img: string, index: number) => {
                    return (
                        <View key={index} style={styles.shopGood}/>
                    )
                })}
            </View>

            <ColoredButton
                text={TEXT.subscribe}
                onPress={()=>{}}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

        </View>
    );
});

const styles = StyleSheet.create({
    card: {
        height: 280,
        width: 200,
        borderRadius: 10,
        backgroundColor: COLORS.White,
        padding: 10,
        alignItems: 'center',
    },
    shopImg: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: COLORS.Red,
        marginTop: 10,
        marginBottom: 5,
    },
    shopGoodsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 180,
        marginBottom: 10,
    },
    shopGood: {
        height: 54,
        width: 54,
        borderRadius: 5,
        backgroundColor: COLORS.GreyBlue,
    },
    button: {
        height: 44,
        width: 180,
    },
    buttonText: {
        fontSize: 14,
        letterSpacing: 0.2,
        fontWeight: '500',
    },
    shopName: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '600',
        marginBottom: 7,
    },
    subscribers: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '400',
        marginBottom: 27,
        color: COLORS.LightGrey,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
});

export default ShopSubscribeCard;
