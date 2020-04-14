import React, {memo} from 'react';
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

const PlainButton = memo((props: IProps) => {
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
        height: 40,
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.DarkGrey,
        fontFamily: 'Montserrat',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default PlainButton;

