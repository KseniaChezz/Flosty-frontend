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

import {IShop} from '../../types/shop';

import {TEXT, COLORS} from '../../constants';

import {getSubscribersValueText} from '../../utils';

interface IProps {
    shop: IShop;
    onCardPress: () => void;
    onSubscribePress: () => void;
}

const ShopSubscribeCard = memo((props: IProps) => {
    const {shop, onCardPress, onSubscribePress} = props;
    const {id, name, subscribers, logo, productImgList} = shop;
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

    const onSubscribeShopPress = () => {
        setIsSubscribed(true);
        onSubscribePress();
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onCardPress}
        >

            <Image
                source={{uri: logo}}
                style={styles.shopImg}
            />

            <Text style={[styles.text, styles.shopName]}>
                {name}
            </Text>

            <Text style={[styles.text, styles.subscribers]}>
                {getSubscribersValueText(subscribers)}
            </Text>

            <View style={styles.shopGoodsContainer}>
                {productImgList.map((img: string, index: number) => {
                    return (
                        <Image
                            key={img}
                            source={{uri: img}}
                            style={styles.shopGood}
                        />
                    )
                })}
            </View>

            <ColoredButton
                text={TEXT.subscribe}
                onPress={onSubscribeShopPress}
                buttonStyle={isSubscribed ? styles.disabledButton : styles.button}
                textStyle={styles.buttonText}
                isDisabled={isSubscribed}
            />

        </TouchableOpacity>
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
    },
    button: {
        height: 44,
        width: 180,
    },
    disabledButton: {
        backgroundColor: COLORS.LightGrey,
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
