import React from 'react';
import {memo} from 'react';
import {
    Text,
    View,
    ViewStyle,
    TextStyle,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    count: number | undefined;
    
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Notification = memo((props: IProps) => {
    const {
        count,
        style,
        textStyle,
    } = props;

    if (count === undefined) {
        return null;
    }

    return (
        <View
            style={[styles.container, style]}
        >
            <Text
                style={[styles.notificationText, textStyle]}
            >
                {count}
            </Text>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        height: 20,
        minWidth: 20,
        backgroundColor: COLORS.BrightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 12,
    },
    notificationText: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.WhiteGrey,
        paddingHorizontal: 3,
    },
});

export default Notification;

