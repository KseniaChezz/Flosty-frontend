import React from 'react';
import {memo, ReactNode} from 'react';
import {
    StyleSheet,
    View,
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
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GreyBlue,
        paddingTop: 50,
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: COLORS.WhiteGrey,
        paddingHorizontal: 25,
        marginBottom: 10,
    },
    policyButtonText: {
        color: COLORS.White,
    },
});

export default LoginAndRegistrationScreenWrapper;
