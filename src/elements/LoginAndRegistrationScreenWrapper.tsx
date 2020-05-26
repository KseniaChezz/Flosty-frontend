import React from 'react';
import {memo, ReactNode} from 'react';
import {
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
} from 'react-native';

import PlainButton from './PlainButton';

import {COLORS, TEXT} from '../constants';

interface IProps {
    children: ReactNode[];
}

const LoginAndRegistrationScreenWrapper = memo((props: IProps) => {
    const {
        children,
    } = props;

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle='light-content' />

            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    {children}
                </View>

                <PlainButton
                    text={TEXT.privacyPolicy}
                    onPress={()=> {}}
                    textStyle={styles.policyButtonText}
                />
            </View>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    safe: {
        backgroundColor: COLORS.GreyBlue,
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.GreyBlue,
        paddingHorizontal: 10,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: COLORS.WhiteGrey,
        paddingHorizontal: 25,
        marginBottom: 10,
        borderRadius: 10,
    },
    policyButtonText: {
        color: COLORS.White,
    },
});

export default LoginAndRegistrationScreenWrapper;
