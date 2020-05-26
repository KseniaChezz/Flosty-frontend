import React from 'react';
import {memo, ReactNode, Fragment} from 'react';
import {
    View,
    SafeAreaView,
    StatusBar,
    ViewStyle,
    StyleSheet,
} from 'react-native';

import Footer from './Footer';
import HeaderWithLogo from './HeaderWithLogo';

import {COLORS} from '../constants/colors';

interface IProps {
    children: ReactNode;
    style?: ViewStyle;
}

const CommonScreenWrapper = memo((props:IProps) => {
    const {
        style,
        children,
    } = props;

    return (
        <Fragment>
            <SafeAreaView style={styles.safeTop} />

            <SafeAreaView style={styles.safe}>

                <StatusBar barStyle='dark-content' />

                <View style={styles.container}>
                    <HeaderWithLogo/>

                    <View style={[styles.innerContainer, style]}>
                        {children}
                    </View>

                    <Footer />
                </View>
            </SafeAreaView>
        </Fragment>
    );
});

const styles = StyleSheet.create({
    safeTop: {
        backgroundColor: COLORS.WhiteGrey,
    },
    safe: {
        flex: 1,
        backgroundColor: COLORS.White,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.WhiteGrey,
    },
    innerContainer: {
        flex: 1,
    },
});

export default CommonScreenWrapper;
