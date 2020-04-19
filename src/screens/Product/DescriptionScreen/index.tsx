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
import {IDescription} from '../../../types/product';

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
                descriptionList,
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
                    {descriptionList.map((item: IDescription) => {
                        const {title, value} = item;

                        return (
                            <Text
                                key={title}
                                style={styles.text}
                            >
                                {title}: {value}
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
