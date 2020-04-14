import React from 'react';
import {memo} from 'react';
import {
    Text,
    TextStyle,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    text: string;
    textStyle?: TextStyle,
}

const Title = memo((props: IProps) => {
    const {
        text,
        textStyle,
    } = props;

    return (
        <Text
            style={[styles.text, textStyle]}
        >
            {text}
        </Text>
    );
});

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Montserrat',
        textAlign: 'center',
        color: COLORS.DarkGrey,
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600',
    },
});

export default Title;
