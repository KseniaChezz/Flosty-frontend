import React from 'react';
import {memo, ReactNode} from 'react';
import {
    View,
    ViewStyle,
    StyleSheet,
} from 'react-native';

import Footer from './Footer';
import HeaderWithLogo from './HeaderWithLogo';

import {COLORS} from '../constants/colors';

interface IProps {
    children: ReactNode;
    navigation: any;

    style?: ViewStyle;
}

const CommonScreenWrapper = memo((props:IProps) => {
    const {
        style,
        children,
        navigation,
    } = props;

    return (
        <View style={styles.container}>
            <HeaderWithLogo
                navigation={navigation}
            />

            <View style={[styles.innerContainer, style]}>
                {children}
            </View>

            <Footer />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WhiteGrey,
    },
    innerContainer: {
        flex: 1,
    },
});

export default CommonScreenWrapper;
