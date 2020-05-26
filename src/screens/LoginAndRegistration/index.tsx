import 'react-native-gesture-handler';
import React, {useState, memo, Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './Login';
import Registration from './Registration';
import RegistrationForm from './RegistrationForm';

import {LoginAndRegistrationNavigatorRoutes} from '../../enums';

import {ILoginAndRegistrationNavigatorParamList} from '../../types/loginAndRegistrationNavigator';

interface IProps {}

const Stack = createStackNavigator<ILoginAndRegistrationNavigatorParamList>();

const LoginAndRegistration = memo((props: IProps) => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator headerMode="none">
                <Stack.Screen
                    name={LoginAndRegistrationNavigatorRoutes.LOGIN_SCREEN}
                    component={Login}
                />
                <Stack.Screen
                    name={LoginAndRegistrationNavigatorRoutes.REGISTRATION_SCREEN}
                    component={Registration}
                />
                <Stack.Screen
                    name={LoginAndRegistrationNavigatorRoutes.REGISTRATION_FORM_SCREEN}
                    component={RegistrationForm}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
});

export default LoginAndRegistration;
