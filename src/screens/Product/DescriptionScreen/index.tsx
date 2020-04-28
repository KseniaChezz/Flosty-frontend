import React from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ScreenWrapperWithBackButton} from '../../../elements';

import {TEXT, COLORS} from '../../../constants';
import {ProductNavigatorRoutes} from '../../../enums';

import {IProductNavigatorParamList} from '../../../types/productNavigator';

type ScreenNavigationProp = StackNavigationProp<IProductNavigatorParamList, ProductNavigatorRoutes.DESCRIPTION_SCREEN>;
type ScreenRouteProp = RouteProp<IProductNavigatorParamList, ProductNavigatorRoutes.DESCRIPTION_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const DescriptionScreen = memo((props: IProps) => {
    const {
        navigation,
        route: {
            params: {
                characteristic,
            }
        }
    } = props;

    const onBackPress = () => {
        navigation.goBack();
    };

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.productDescription}
            onBackPress={onBackPress}
        >
            <View style={styles.container}>
                <ScrollView>
                    {Object.keys(characteristic).map((key: string) => {

                        return (
                            <Text
                                key={key}
                                style={styles.text}
                            >
                                {key}: {characteristic[key]}
                            </Text>
                        )
                    })}
                </ScrollView>
            </View>

        </ScreenWrapperWithBackButton>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: COLORS.White,
        marginTop: 10,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 10,
    },
});

export default DescriptionScreen;
