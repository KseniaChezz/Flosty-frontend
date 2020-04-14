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
    textStyle?: TextStyle;
}

const SubTitle = memo((props: IProps) => {
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
        fontSize: 18,
    },
});

export default SubTitle;
