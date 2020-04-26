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

import {ISubscription, ISubstrictionItem, ISubscriptionShop} from '../../types/subscription';

import {TEXT, COLORS} from '../../constants';

interface IProps {
    subscription: ISubscription;
    onEditPress: () => void;
    onUnSubscribePress: () => void;
}

const AdjustedSubscriptionCard = memo((props: IProps) => {
    const {subscription, onEditPress, onUnSubscribePress} = props;
    const {shops, tags} = subscription;

    return (
        <View style={styles.card}>
            <View style={styles.tagsContainer}>
                <Image
                    source={require('../../../assets/images/link.png')}
                    style={styles.linkImg}
                />

                <View style={styles.textContainer}>
                    {shops.map((shop: ISubscriptionShop) => {
                        const {name} = shop;

                        return (
                            <Text style={[styles.text, styles.tagText]}>{name}</Text>
                        )
                    })}

                    {tags.map((tag: ISubscriptionShop) => {
                        const {name} = tag;

                        return (
                            <Text style={[styles.text, styles.tagText]}>#{name}</Text>
                        )
                    })}
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <ColoredButton
                    text={TEXT.unsubscribe}
                    onPress={onUnSubscribePress}
                    buttonStyle={styles.button}
                    textStyle={styles.text}
                />

                <TouchableOpacity
                    onPress={onEditPress}
                    style={styles.editImgContainer}
                >
                    <Image
                        source={require('../../../assets/images/edit.png')}
                        style={styles.editImg}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: COLORS.White,
        padding: 8,
        marginBottom: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    textContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    linkImg: {
        height: 34,
        width: 34,
        borderRadius: 17,
        marginRight: 15,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        fontSize: 14,
        fontWeight: '500',
    },
    tagText: {
        marginRight: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        height: 44,
        marginTop: 0,
        marginBottom: 0,
        flex: 1,
        backgroundColor: COLORS.Border,
    },
    editImgContainer: {
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editImg: {
        height: 24,
        width: 24,
    },

});

export default AdjustedSubscriptionCard;
