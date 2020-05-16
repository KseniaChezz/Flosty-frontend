import 'react-native-gesture-handler';
import React, {useState, memo} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import RootOrderScreen from './RootOrderScreen';
import PaymentScreen from './PaymentScreen';

import {COLORS} from '../../../constants';
import {OrderNavigatorRoutes} from '../../../enums/orderNavigatorRoutes';

import {IOrderNavigatorParamList} from '../../../types/orderNavigator';
import { UserCard } from '../../User';

interface IProps {
    isWindowVisible: boolean;
    selectedProductsPrice: number;
    hide: () => void;
}

const Stack = createStackNavigator<IOrderNavigatorParamList>();

const OrderWindow = memo((props: IProps) => {
    const {
        isWindowVisible,
        selectedProductsPrice,
        hide,
    } = props;

    return (
        <Modal isVisible={isWindowVisible} style={styles.modalContainer}>

            <View style={styles.modalInnerContainer}>
                <NavigationContainer independent={true}>
                    <Stack.Navigator headerMode="none">
                        <Stack.Screen
                            name={OrderNavigatorRoutes.ROOT_ORDER_SCREEN}
                            component={RootOrderScreen}
                            initialParams={{selectedProductsPrice, hide}}
                        />
                        <Stack.Screen
                            name={OrderNavigatorRoutes.PAYMENT_SCREEN}
                            component={PaymentScreen}
                        />
                        <Stack.Screen
                            name={OrderNavigatorRoutes.NEW_CARD_SCREEN}
                            component={UserCard}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
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
});

export default OrderWindow;
