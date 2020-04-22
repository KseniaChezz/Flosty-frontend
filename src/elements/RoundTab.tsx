import React from 'react';
import {memo} from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    title: string;
    isSelected: boolean;
    onPress: () => void;
}

const RoundTab = memo((props: IProps) => {
    const {
        title,
        isSelected,
        onPress,
    } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.filter, isSelected ? styles.filterSelected : styles.filterPlain]}
        >
            <Text style={[styles.text, isSelected ? styles.selectedText : styles.plainText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    filter: {
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    filterPlain: {
        borderColor: COLORS.BrightBlue,
        borderWidth: 1,
    },
    filterSelected: {
        backgroundColor: COLORS.BrightBlue,
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        lineHeight: 16,
    },
    selectedText: {
        color: COLORS.White,
    },
    plainText: {
        color: COLORS.BrightBlue,
    },
});

export default RoundTab;
