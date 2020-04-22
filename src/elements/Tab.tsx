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

const Tab = memo((props: IProps) => {
    const {
        title,
        isSelected,
        onPress,
    } = props;

    return (
        <TouchableOpacity
            style={[styles.tab, isSelected ? styles.tabSelected : null]}
            onPress={onPress}
        >
            <Text style={[styles.tabText, isSelected ? styles.tabTextSelected : null]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        height: 44,
        backgroundColor: COLORS.White,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: COLORS.Border,
        borderRightWidth: 1,
    },
    tabSelected: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.BorderDark,
    },
    tabText: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        fontSize: 16,
        lineHeight: 20,
    },
    tabTextSelected: {
        fontWeight: '600',
    },
});

export default Tab;
