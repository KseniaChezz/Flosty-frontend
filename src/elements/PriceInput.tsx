import React from 'react';
import {memo} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ViewStyle,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    text: string;
    value: string;
    onChangeValue: (value: string) => void;
    style?: ViewStyle;
}

const PriceInput = memo((props: IProps) => {
    const {
        text,
        value,
        onChangeValue,
        style,
    } = props;

    return (
        <View style={[styles.inputInnerContainer, style]}>
            <Text style={[styles.text, styles.greyText]}>
                {text}
            </Text>

            <TextInput
                value={value}
                onChangeText={onChangeValue}
                keyboardType={'numeric'}
                style={[styles.text, styles.input]}
            />

            <Text style={[styles.text, styles.greyText]}>
                {String.fromCharCode(0x20BD)}
            </Text>
        </View>
    );
});

const styles = StyleSheet.create({
    inputInnerContainer: {
        flexDirection: 'row',
        flex: 1,
        height: 34,
        borderRadius: 10,
        borderColor: COLORS.DarkGrey,
        borderWidth: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
        marginHorizontal: 10,
    },
    text: {
        fontFamily: 'Montserrat',
    },
    greyText: {
        color: COLORS.LightGrey,
        fontSize: 14,
        lineHeight: 18,
    },
});

export default PriceInput;
