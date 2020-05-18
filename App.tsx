/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';

import RootNavigator from './src/RootNavigator';

import {store} from './src/store';

console.disableYellowBox = true;

const App = () => {
    return (
        <Provider store={store}>
            <RootNavigator/>
        </Provider>
    );
};

export default App;
