import React, {memo} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {IMessage} from '../types/user';

import {COLORS} from '../constants';
import {MessageAuthor, RootNavigatorRoutes} from '../enums';

import {getTime} from '../utils';

interface IProps {
    message: IMessage;
}

const ChatMessage = memo((props: IProps) => {
    const {
        message: {
            text,
            date,
            author,
        }
    } = props;
    const isUserMessage: boolean = author === MessageAuthor.USER;

    return (
        <View style={[styles.messageContainer, isUserMessage ? styles.flexEnd : styles.flexStart]}>
            <View style={[
                styles.commonMessageContainer,
                isUserMessage
                    ? styles.userMessageContainer
                    : styles.supportMessageContainer,
            ]}>
                <Text style={[styles.text, styles.messageText]}>
                    {text}
                </Text>
                <Text style={[styles.text, styles.dateText]}>
                    {getTime(date)}
                </Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    commonMessageContainer: {
        flexDirection: 'row',
        maxWidth: '75%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.DarkGrey,
        padding: 10,
        paddingBottom: 5,
        alignItems: 'flex-end',
    },
    supportMessageContainer: {
        backgroundColor: COLORS.White,
        marginLeft: 10,
    },
    userMessageContainer: {
        backgroundColor: COLORS.BlueTransparent,
        marginRight: 10,
    },
    flexStart: {
        justifyContent: 'flex-start',
    },
    flexEnd: {
        justifyContent: 'flex-end',
    },
    text: {
        fontFamily: 'Montserrat',
    },
    messageText: {
        fontSize: 14,
        lineHeight: 18,
        color: COLORS.DarkGrey,
        paddingBottom: 5,
        marginRight: 5,
        width: '90%',
    },
    dateText: {
        fontSize: 10,
        lineHeight: 14,
        color: COLORS.LightGrey,
        width: '10%',
    },
});

export default ChatMessage;
