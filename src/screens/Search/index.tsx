import 'react-native-gesture-handler';
import React, {useState, memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SearchRootScreen from './SearchRootScreen';
import SearchMenuScreen from './SearchMenuScreen';

import {SearchNavigatorRoutes} from '../../enums';

import {ISearchNavigatorParamList} from '../../types/searchNavigator';

interface IProps {}

const Stack = createStackNavigator<ISearchNavigatorParamList>();

const Search = memo((props: IProps) => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator headerMode="none">
                <Stack.Screen
                    name={SearchNavigatorRoutes.SEARCH_ROOT_SCREEN}
                    component={SearchRootScreen}
                />
                <Stack.Screen
                    name={SearchNavigatorRoutes.SEARCH_MENU_SCREEN}
                    component={SearchMenuScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
});

export default Search;
