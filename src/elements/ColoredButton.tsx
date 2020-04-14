import React from 'react';
import {memo} from 'react';
import {
    Text,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    text: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const ColoredButton = memo((props: IProps) => {
    const {
        text,
        onPress,
        buttonStyle,
        textStyle,
    } = props;

    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onPress}
        >
            <Text
                style={[styles.buttonText, textStyle]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    button: {
        height: 55,
        justifyContent: 'center',
        backgroundColor: COLORS.Yellow,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: COLORS.DarkGrey,
        fontFamily: 'Montserrat',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default ColoredButton;
