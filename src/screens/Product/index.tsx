import 'react-native-gesture-handler';
import React, {useState, memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ProductProfileScreen from './ProductProfileScreen';
import DescriptionScreen from './DescriptionScreen';
import GuaranteeScreen from './GuaranteeScreen';

import {ProductNavigatorRoutes} from '../../enums';

import {IProductNavigatorParamList} from '../../types/productNavigator';

interface IProps {}

const Stack = createStackNavigator<IProductNavigatorParamList>();

const Product = memo((props: IProps) => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator headerMode="none">
                <Stack.Screen
                    name={ProductNavigatorRoutes.PRODUCT_PROFILE_SCREEN}
                    component={ProductProfileScreen}
                />
                <Stack.Screen
                    name={ProductNavigatorRoutes.DESCRIPTION_SCREEN}
                    component={DescriptionScreen}
                />
                <Stack.Screen
                    name={ProductNavigatorRoutes.GUARANTEE_SCREEN}
                    component={GuaranteeScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
});

export default Product;
