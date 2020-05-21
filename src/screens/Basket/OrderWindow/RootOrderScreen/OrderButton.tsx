import React, {useState, memo} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {ColoredButton} from '../../../../elements';

import {TEXT, COLORS} from '../../../../constants';

interface IProps {
    isDisabled: boolean;
    onPress: () => void;
}

const OrderButton = memo((props: IProps) => {
    const {
        isDisabled,
        onPress,
    } = props;

    return (
        <View>
            <ColoredButton
                text={TEXT.agreeOrder}
                onPress={onPress}
                buttonStyle={isDisabled ? styles.buttonDisabled : styles.buttonActive}
                textStyle={isDisabled ? styles.buttonDisabledText : styles.buttonActiveText}
                isDisabled={isDisabled}
            />

            <Text style={styles.conditionsText}>
                {TEXT.pressOrder}
                <Text
                    style={[styles.conditionsText, styles.conditionButtonText]}
                    onPress={()=>{}}
                >
                    {TEXT.userAgreement}
                </Text>
            </Text>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonActive: {
        height: 44,
        margin: 10,
        marginBottom: 10,
    },
    buttonDisabled: {
        height: 44,
        margin: 10,
        marginBottom: 10,
        backgroundColor: COLORS.Border,
    },
    buttonActiveText: {
        color: COLORS.DarkGrey,
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonDisabledText: {
        color: COLORS.LightGrey,
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '600',
    },
    conditionsText: {
        fontSize: 12,
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    conditionButtonText: {
        color: COLORS.Blue,
    },
});

export default OrderButton;
