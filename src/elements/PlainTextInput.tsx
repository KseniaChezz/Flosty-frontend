import React from 'react';
import {memo} from 'react';
import {
    TextInput,
    ViewStyle,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    value: string;
    secureTextEntry?: boolean;
    placeholder?: string;
    
    onChange: (text: string) => void;
    
    style?: ViewStyle;
}

const PlainTextInput = memo((props: IProps) => {
    const {
        value,
        secureTextEntry,
        placeholder,
        onChange,
        style,
    } = props;

    return (
        <TextInput
            value={value}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            placeholder={placeholder}
            style={[styles.textInput, style]}
        />
    );
});

const styles = StyleSheet.create({
    textInput: {
        height: 44,
        borderWidth: 1,
        borderColor: COLORS.DarkGrey,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        fontFamily: 'Montserrat',
    },
});

export default PlainTextInput;

