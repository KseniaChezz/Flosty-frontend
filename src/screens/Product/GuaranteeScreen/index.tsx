import React from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {ScreenWrapperWithBackButton} from '../../../elements';
import GuaranteeCard from './GuaranteeCard';

import {TEXT, COLORS} from '../../../constants';
import {ProductNavigatorRoutes} from '../../../enums';

import {IProductNavigatorParamList} from '../../../types/productNavigator';

type ScreenNavigationProp = StackNavigationProp<IProductNavigatorParamList, ProductNavigatorRoutes.GUARANTEE_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const GuaranteeScreen = memo((props: IProps) => {
    const {navigation} = props;

    const onBackPress = () => {
        navigation.goBack();
    };

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.guarantee}
            onBackPress={onBackPress}
        >
            <View style={styles.flostyGuaranteeTitleContainer}>
                <Text style={[styles.text, styles.titleText]}>
                    {TEXT.flostyGuaranteeTitle}
                </Text>
            </View>

            <GuaranteeCard
                text={TEXT.returnMoneyTime}
                img={require('../../../../assets/images/guarantee1.png')}
            />

            <GuaranteeCard
                text={TEXT.wrongDescription}
                img={require('../../../../assets/images/guarantee2.png')}
            />

            <GuaranteeCard
                text={TEXT.returnMoneyOnCount}
                img={require('../../../../assets/images/guarantee3.png')}
            />
        </ScreenWrapperWithBackButton>
    );
});

const styles = StyleSheet.create({
    flostyGuaranteeTitleContainer: {
        backgroundColor: COLORS.Blue,
        marginTop: 10,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 44,
    },
    text: {
        fontFamily: 'Montserrat',
    },
    titleText: {
        color: COLORS.White,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
    },
});

export default GuaranteeScreen;
