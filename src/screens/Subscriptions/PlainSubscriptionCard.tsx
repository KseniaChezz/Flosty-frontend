import React from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {ColoredButton} from '../../elements';

import {ISubscription, ISubstrictionItem} from '../../types/subscription';

import {TEXT, COLORS} from '../../constants';

import {getSubscribersValueText} from '../../utils';
import {SubscriptionType} from '../../enums';

interface IProps {
    subscription: ISubscription;
    onUnSubscribePress: () => void;
    onCardPress: () => void;
}

const PlainSubscriptionCard = memo((props: IProps) => {
    const {subscription, onCardPress, onUnSubscribePress} = props;
    const {id, shops, tags, type} = subscription;
    const subscriptionItem: ISubstrictionItem = type === SubscriptionType.SHOP ? shops[0] : tags[0];
    const {name, image, subscribers} = subscriptionItem;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onCardPress}
        >

            <Image
                source={{uri: image}}
                style={styles.shopImg}
            />

            <Text style={[styles.text, styles.title]}>
                {type === SubscriptionType.SHOP ? name : `#${name}`}
            </Text>

            <Text style={[styles.text, styles.subscribers]}>
                {getSubscribersValueText(subscribers)}
            </Text>

            <ColoredButton
                text={TEXT.unsubscribe}
                onPress={onUnSubscribePress}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    card: {
        width: 120,
        borderRadius: 10,
        backgroundColor: COLORS.White,
        padding: 8,
        alignItems: 'center',
        marginRight: 5,
        marginBottom: 10,
    },
    shopImg: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 5,
    },
    button: {
        height: 44,
        marginTop: 0,
        marginBottom: 0,
        paddingHorizontal: 7,
        backgroundColor: COLORS.Border,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    title: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '600',
        marginBottom: 7,
    },
    subscribers: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '400',
        marginBottom: 12,
        color: COLORS.LightGrey,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
});

export default PlainSubscriptionCard;
