import React, {memo, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {IMessage, IShopMessageMap, IShopMessage} from '../../../types/user';

import {getUserCommunicationShopList, getTimeOrDate} from '../../../utils';
import {getMessageCut} from '../../../utils/user';

import {COLORS} from '../../../constants';

interface IProps {
    shopItem: IShopMessage;

    onPress: () => void;
}

const CommunicationShopCard = memo((props: IProps) => {
    const {
        shopItem: {
            messageList,
            name,
        },
        onPress,
    } = props;
    const lastMessage: IMessage = messageList[0];
    const {text, date, author} = lastMessage;

    return (
        <TouchableOpacity
            style={styles.shopContainer}
            onPress={onPress}
        >

            <View style={styles.shopImgContainer}/>

            <View style={styles.shopTextContainer}>

                <View style={styles.nameAndDateContainer}>

                    <Text style={[styles.text, styles.name]}>
                        {name}
                    </Text>

                    <Text style={[styles.text, styles.date]}>
                        {getTimeOrDate(date)}
                    </Text>

                </View>

                <Text style={[styles.text, styles.message]}>
                    {getMessageCut(lastMessage, name)}
                </Text>

            </View>

        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    shopContainer: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: COLORS.White,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    shopImgContainer: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: COLORS.BrightBlue,
    },
    shopTextContainer: {
        flex: 1,
        paddingLeft: 15,
    },
    nameAndDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontFamily: 'Montserrat',
    },
    name: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600',
        color: COLORS.DarkGrey,
    },
    date: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '400',
        color: COLORS.LightGrey,
    },
    message: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        color: COLORS.LightGrey,
    },
});

export default CommunicationShopCard;
