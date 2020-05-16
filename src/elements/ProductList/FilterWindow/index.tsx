import 'react-native-gesture-handler';
import React, {useState, memo} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ColoredButton from '../../ColoredButton';
import RootFilterScreen from './RootFilterScreen';
import FilterItemScreen from './FilterItemScreen';
import DetailFilterItemScreen from './DetailFilterItemScreen';

import {TEXT, COLORS, sortingFilter} from '../../../constants';
import {FilterNavigatorRoutes} from '../../../enums/filterNavigatorRoutes';

import {IFilterNavigatorParamList} from '../../../types/filterNavigator';

interface IProps {
    isWindowVisible: boolean;
    onShowPress: () => void;
}

const Stack = createStackNavigator<IFilterNavigatorParamList>();

const FilterWindow = memo((props: IProps) => {
    const {
        isWindowVisible,
        onShowPress,
    } = props;

    return (
        <Modal isVisible={isWindowVisible} style={styles.modalContainer}>

            <View style={styles.modalInnerContainer}>
                <NavigationContainer independent={true}>
                    <Stack.Navigator headerMode="none">
                        <Stack.Screen
                            name={FilterNavigatorRoutes.ROOT_FILTER_SCREEN}
                            component={RootFilterScreen}
                        />
                        <Stack.Screen
                            name={FilterNavigatorRoutes.FILTER_ITEM_SCREEN}
                            component={FilterItemScreen}
                        />
                        <Stack.Screen
                            name={FilterNavigatorRoutes.DETAIL_FILTER_ITEM_SCREEN}
                            component={DetailFilterItemScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>

                <ColoredButton
                    text={TEXT.show}
                    onPress={onShowPress}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>

        </Modal>
    );
});

const styles = StyleSheet.create({
    modalContainer: {
        marginHorizontal: 0,
        marginBottom: 0,
        marginTop: 40,
    },
    modalInnerContainer: {
        flex: 1,
        backgroundColor: COLORS.White,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden',
    },
    button: {
        height: 44,
        backgroundColor: COLORS.LightBlue,
        margin: 10,
    },
    buttonText: {
        color: COLORS.White,
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default FilterWindow;
