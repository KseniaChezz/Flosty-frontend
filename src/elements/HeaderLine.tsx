import React from 'react';
import {memo, ReactNode} from 'react';
import {
    View,
    ViewStyle,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants/';

interface IProps {
    children: ReactNode[];
    noShadow?: boolean;
    style?: ViewStyle;
}

const HeaderLine = memo((props: IProps) => {
    const {
        children,
        noShadow,
        style,
    } = props;

    return (
        <View
            style={[styles.container, !noShadow ? styles.shadow : null, style]}
        >
            {children}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: COLORS.White,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: COLORS.GreyBlue,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
    }
});

export default HeaderLine;

